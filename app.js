+   1 // Zimbabwe Vision 2030 Portal - Dynamic Functionality
+   2 // Data Management System
// Global state
let appData = null;
let autoUpdateInterval = null;
let dataSource = 'local';  // 'local' or 'remote'
let remoteDataUrl = '';

// Initialize application
document.addEventListener('DOMContentLoaded', async () => {
	await loadData();
	initializeEventListeners();
	loadResources();
	loadProjects();
	setupFilterButtons();
	
	// Enable admin panel with Ctrl+Shift+A
	document.addEventListener('keydown', (e) => {
		if (e.ctrlKey && e.shiftKey && e.key === 'A') {
			document.getElementById('admin-panel').classList.toggle('hidden');
		}
	});
});

// Data Loading Functions
async function loadData() {
	try {
		const savedSource = localStorage.getItem('dataSource') || 'local';
		dataSource = savedSource;
		
		if (dataSource === 'remote') {
			remoteDataUrl = localStorage.getItem('remoteDataUrl') || '';
			if (remoteDataUrl) {
				const response = await fetch(remoteDataUrl);
				appData = await response.json();
			} else {
				await loadLocalData();
			}
		} else {
			await loadLocalData();
		}
		
		console.log('Data loaded successfully:', appData);
	} catch (error) {
		console.error('Error loading data:', error);
		await loadLocalData(); // Fallback to local data
	}
}

async function loadLocalData() {
	try {
		const response = await fetch('data.json');
		appData = await response.json();
	} catch (error) {
		console.error('Error loading local data:', error);
		// Fallback embedded data
		appData = getFallbackData();
	}
}

function getFallbackData() {
	return {
		metadata: { lastUpdated: new Date().toISOString(), version: "1.0" },
		economicData: { gdp: { current: 45.7, growthRate2025: 6.0 } },
		infrastructure: [],
		resources: [],
		news: []
	};
}

// Resource Loading and Display
function loadResources() {
	const container = document.getElementById('resources-container');
	
	if (!appData || !appData.resources || appData.resources.length === 0) {
		container.innerHTML = '<div class="col-span-full text-center text-gray-600 dark:text-gray-400 py-8">No resources available</div>';
		return;
	}
	
	container.innerHTML = appData.resources.map(resource => `
		<div class="bg-gray-50 dark:bg-dark-bg rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
			<div class="flex items-center mb-4">
				<div class="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
					<i class="fas fa-file-pdf text-xl"></i>
				</div>
				<div class="ml-4 flex-1">
					<h4 class="font-bold text-primary dark:text-secondary">${resource.title}</h4>
					<span class="text-xs text-gray-500">${resource.category} • ${resource.size}</span>
				</div>
			</div>
			<p class="text-sm text-gray-600 dark:text-gray-400 mb-4">${resource.description}</p>
			<a href="${resource.url}" target="_blank" class="block w-full bg-primary hover:bg-green-800 text-white text-center px-4 py-2 rounded-lg font-medium transition-all">
				<i class="fas fa-download mr-2"></i>Download
			</a>
		</div>
	`).join('');
}

// Project Loading and Filtering
function loadProjects() {
	if (!appData || !appData.infrastructure) return;
	
	const container = document.getElementById('projects-container');
	renderProjects(appData.infrastructure);
}

function renderProjects(projects) {
	const container = document.getElementById('projects-container');
	
	if (!projects || projects.length === 0) {
		container.innerHTML = '<div class="col-span-full text-center text-gray-600 dark:text-gray-400 py-8">No projects available</div>';
		return;
	}
	
	container.innerHTML = projects.map(project => `
		<div class="bg-white dark:bg-dark-card rounded-lg shadow-lg p-6 project-card" data-type="${project.type}">
			<div class="flex items-center justify-between mb-4">
				<span class="px-3 py-1 bg-primary text-white rounded-full text-xs font-bold">${project.type}</span>
				${project.status ? `<span class="text-xs text-gray-500 dark:text-gray-400">${project.status}</span>` : ''}
			</div>
			<h3 class="text-xl font-bold mb-2 text-primary dark:text-secondary">${project.name}</h3>
			${project.location ? `<p class="text-sm text-gray-600 dark:text-gray-400 mb-3"><i class="fas fa-map-marker-alt mr-1"></i>${project.location}</p>` : ''}
			${project.description ? `<p class="text-sm text-gray-600 dark:text-gray-400 mb-4">${project.description}</p>` : ''}
			
			${project.progress !== undefined ? `
				<div class="mb-3">
					<div class="flex justify-between text-sm mb-1">
						<span>Progress</span>
						<span class="font-bold text-primary dark:text-secondary">${project.progress}%</span>
					</div>
					<div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
						<div class="bg-gradient-to-r from-primary to-success h-3 rounded-full transition-all duration-500" style="width: ${project.progress}%"></div>
					</div>
				</div>
			` : ''}
			
			${project.investment ? `<p class="text-sm"><strong>Investment:</strong> $${(project.investment / 1000000000).toFixed(1)}B</p>` : ''}
			${project.jobs ? `<p class="text-sm"><strong>Jobs Created:</strong> ${project.jobs.toLocaleString()}</p>` : ''}
			${project.institutionsElectrified ? `<p class="text-sm"><strong>Institutions:</strong> ${project.institutionsElectrified.toLocaleString()}</p>` : ''}
		</div>
	`).join('');
}

function setupFilterButtons() {
	const buttons = document.querySelectorAll('.filter-btn');
	buttons.forEach(btn => {
		btn.addEventListener('click', () => {
			buttons.forEach(b => b.classList.remove('active', 'bg-primary', 'text-white'));
			btn.classList.add('active', 'bg-primary', 'text-white');
		});
	});
}

function filterProjects(type) {
	if (!appData || !appData.infrastructure) return;
	
	if (type === 'all') {
		renderProjects(appData.infrastructure);
	} else {
		const filtered = appData.infrastructure.filter(p => p.type === type);
		renderProjects(filtered);
	}
}

// Live Assistant / Q&A Functionality using Poe Embed API
async function askQuestion(question) {
	const questionText = question || document.getElementById('user-question').value.trim();
	
	if (!questionText) return;
	
	const chatMessages = document.getElementById('chat-messages');
	const userInput = document.getElementById('user-question');
	
	// Clear placeholder if present
	if (chatMessages.querySelector('.text-center')) {
		chatMessages.innerHTML = '';
	}
	
	// Add user message
	addChatMessage('user', questionText);
	userInput.value = '';
	
	// Add loading message
	const loadingId = addChatMessage('assistant', 'Thinking...', true);
	
	try {
		// Check if Poe Embed API is available
		if (typeof window.Poe !== 'undefined' && window.Poe.sendUserMessage) {
			// Register handler for response
			window.Poe.registerHandler('vision2030-assistant', (result, context) => {
				const msg = result.responses[0];
				
				// Remove loading message
				document.getElementById(loadingId)?.remove();
				
				if (msg.status === 'error') {
					addChatMessage('assistant', `Error: ${msg.statusText || 'Failed to get response'}`);
				} else if (msg.status === 'complete') {
					addChatMessage('assistant', msg.content);
				} else if (msg.status === 'incomplete') {
					// Update streaming response
					updateChatMessage(context.messageId, msg.content);
				}
			});
			
			// Send message to Claude
			const contextInfo = appData ? JSON.stringify({
				gdp: appData.economicData?.gdp,
				programs: appData.programs?.map(p => p.name),
				sectors: appData.economicData?.sectors?.map(s => s.name)
			}) : '';
			
			await window.Poe.sendUserMessage(
				`@Claude-Sonnet-4.5 You are an expert assistant for Zimbabwe's Vision 2030 initiative. Answer questions about Zimbabwe's economic development, programs (TSP, NDS1, NDS2), sectors, and progress. Be concise and informative. Context: ${contextInfo}\n\nQuestion: ${questionText}`,
				{
					handler: 'vision2030-assistant',
					stream: true,
					openChat: false,
					handlerContext: { messageId: `msg-${Date.now()}` }
				}
			);
		} else {
			// Fallback: Provide static responses
			document.getElementById(loadingId)?.remove();
			const response = getStaticResponse(questionText);
			addChatMessage('assistant', response);
		}
	} catch (error) {
		console.error('Error sending question:', error);
		document.getElementById(loadingId)?.remove();
		addChatMessage('assistant', 'Sorry, I encountered an error. Please try again.');
	}
}

function addChatMessage(sender, content, isLoading = false) {
	const chatMessages = document.getElementById('chat-messages');
	const messageId = `msg-${Date.now()}-${Math.random()}`;
	
	const messageDiv = document.createElement('div');
	messageDiv.id = messageId;
	messageDiv.className = `mb-4 ${sender === 'user' ? 'text-right' : 'text-left'}`;
	
	messageDiv.innerHTML = `
		<div class="inline-block max-w-[80%] ${sender === 'user' ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'} rounded-lg px-4 py-2">
			${isLoading ? '<i class="fas fa-spinner fa-spin mr-2"></i>' : ''}
			${content}
		</div>
	`;
	
	chatMessages.appendChild(messageDiv);
	chatMessages.scrollTop = chatMessages.scrollHeight;
	
	return messageId;
}

function updateChatMessage(messageId, content) {
	const messageDiv = document.getElementById(messageId);
	if (messageDiv) {
		const contentDiv = messageDiv.querySelector('div');
		contentDiv.innerHTML = content;
	}
}

function getStaticResponse(question) {
	const lowerQ = question.toLowerCase();
	
	if (lowerQ.includes('vision 2030') || lowerQ.includes('what is')) {
		return "Vision 2030 is Zimbabwe's roadmap to becoming an upper middle-income economy by 2030, focused on inclusive growth, modern infrastructure, good governance, and environmental sustainability.";
	} else if (lowerQ.includes('nds1') || lowerQ.includes('achievement')) {
		return "NDS1 (2021-2025) exceeded targets with 6.3% average annual growth, created 820,000+ jobs, made manufacturing the largest GDP contributor (15.3%), and accelerated infrastructure development including dams, roads, and energy projects.";
	} else if (lowerQ.includes('gdp') || lowerQ.includes('growth')) {
		return "Zimbabwe's GDP was $45.7B in 2024. The economy is projected to grow by 6.0% in 2025, recovering strongly from the 2.0% growth in 2024 (affected by El Niño drought).";
	} else if (lowerQ.includes('infrastructure') || lowerQ.includes('project')) {
		return "Major infrastructure projects include: Kunzvi Dam (65% complete), Gwayi-Shangani Dam (72.4% complete), Lake Gwayi-Tshangani (50% complete), DISCO Steel Plant ($1.5B), and rural electrification (2,106 institutions completed).";
	} else if (lowerQ.includes('nds2')) {
		return "NDS2 (2026-2030) is the final phase to achieve Vision 2030 goals. Cabinet approved the roadmap in September 2024. Focus areas: fiscal discipline, creating 2M jobs, halving poverty, and transitioning to mono-currency by 2030.";
	} else {
		return "I can help you with information about Zimbabwe's Vision 2030, development programs (TSP, NDS1, NDS2), economic data, sectors, and infrastructure projects. What would you like to know?";
	}
}

// Feedback Form Handling
function initializeEventListeners() {
	const feedbackForm = document.getElementById('feedback-form');
	if (feedbackForm) {
		feedbackForm.addEventListener('submit', handleFeedbackSubmit);
	}
}

function handleFeedbackSubmit(e) {
	e.preventDefault();
	
	const name = document.getElementById('feedback-name').value;
	const email = document.getElementById('feedback-email').value;
	const category = document.getElementById('feedback-category').value;
	const message = document.getElementById('feedback-message').value;
	
	const feedbackData = { name, email, category, message, timestamp: new Date().toISOString() };
	
	// Save to localStorage (in real app, send to server)
	const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
	feedbacks.push(feedbackData);
	localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
	
	// Show success message
	const responseDiv = document.getElementById('feedback-response');
	responseDiv.className = 'mt-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 p-4 rounded-lg';
	responseDiv.textContent = 'Thank you for your feedback! We appreciate your input.';
	responseDiv.classList.remove('hidden');
	
	// Reset form
	e.target.reset();
	
	// Hide message after 5 seconds
	setTimeout(() => {
		responseDiv.classList.add('hidden');
	}, 5000);
}

// Admin Panel Functions
function toggleAdminPanel() {
	const modal = document.getElementById('admin-modal');
	modal.classList.toggle('hidden');
	
	// Load saved settings
	if (!modal.classList.contains('hidden')) {
		const savedSource = localStorage.getItem('dataSource') || 'local';
		document.getElementById('data-source-type').value = savedSource;
		if (savedSource === 'remote') {
			document.getElementById('remote-url-input').classList.remove('hidden');
			document.getElementById('remote-data-url').value = localStorage.getItem('remoteDataUrl') || '';
		}
	}
}

function toggleDataSource() {
	const sourceType = document.getElementById('data-source-type').value;
	const remoteUrlInput = document.getElementById('remote-url-input');
	
	if (sourceType === 'remote') {
		remoteUrlInput.classList.remove('hidden');
	} else {
		remoteUrlInput.classList.add('hidden');
	}
}

async function updateDataSource() {
	const sourceType = document.getElementById('data-source-type').value;
	const remoteUrl = document.getElementById('remote-data-url').value;
	
	localStorage.setItem('dataSource', sourceType);
	
	if (sourceType === 'remote') {
		if (!remoteUrl) {
			showNotification('Please enter a remote data URL', 'error');
			return;
		}
		localStorage.setItem('remoteDataUrl', remoteUrl);
	}
	
	dataSource = sourceType;
	remoteDataUrl = remoteUrl;
	
	await refreshData();
	showNotification('Data source updated successfully!', 'success');
}

async function refreshData() {
	showNotification('Refreshing data...', 'info');
	await loadData();
	loadResources();
	loadProjects();
	showNotification('Data refreshed successfully!', 'success');
}

function exportData() {
	if (!appData) {
		showNotification('No data to export', 'error');
		return;
	}
	
	const dataStr = JSON.stringify(appData, null, 2);
	const dataBlob = new Blob([dataStr], { type: 'application/json' });
	const url = URL.createObjectURL(dataBlob);
	const link = document.createElement('a');
	link.href = url;
	link.download = `vision2030-data-${new Date().toISOString().split('T')[0]}.json`;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
	
	showNotification('Data exported successfully!', 'success');
}

async function importData(event) {
	const file = event.target.files[0];
	if (!file) return;
	
	try {
		const text = await file.text();
		const importedData = JSON.parse(text);
		
		// Validate data structure
		if (!importedData.metadata || !importedData.economicData) {
			throw new Error('Invalid data format');
		}
		
		appData = importedData;
		localStorage.setItem('customData', JSON.stringify(importedData));
		
		loadResources();
		loadProjects();
		
		showNotification('Data imported successfully!', 'success');
	} catch (error) {
		console.error('Import error:', error);
		showNotification('Failed to import data. Please check file format.', 'error');
	}
}

function toggleAutoUpdate() {
	const toggle = document.getElementById('auto-update-toggle');
	const settings = document.getElementById('auto-update-settings');
	
	if (toggle.checked) {
		settings.classList.remove('hidden');
		const interval = parseInt(document.getElementById('update-interval').value) || 30;
		startAutoUpdate(interval);
		showNotification(`Auto-update enabled (every ${interval} minutes)`, 'success');
	} else {
		settings.classList.add('hidden');
		stopAutoUpdate();
		showNotification('Auto-update disabled', 'info');
	}
}

function startAutoUpdate(intervalMinutes) {
	stopAutoUpdate(); // Clear any existing interval
	
	autoUpdateInterval = setInterval(async () => {
		console.log('Auto-updating data...');
		await refreshData();
	}, intervalMinutes * 60 * 1000);
}

function stopAutoUpdate() {
	if (autoUpdateInterval) {
		clearInterval(autoUpdateInterval);
		autoUpdateInterval = null;
	}
}

function toggleResourceUpload() {
	const uploadPanel = document.getElementById('admin-upload');
	uploadPanel.classList.toggle('hidden');
	showNotification('Resource upload panel toggled', 'info');
}

function addResource() {
	const title = document.getElementById('resource-title').value;
	const url = document.getElementById('resource-url').value;
	const category = document.getElementById('resource-category').value;
	const size = document.getElementById('resource-size').value;
	const description = document.getElementById('resource-description').value;
	
	if (!title || !url || !description) {
		showNotification('Please fill in all required fields', 'error');
		return;
	}
	
	const newResource = {
		title,
		url,
		category,
		size,
		description,
		type: 'PDF',
		local: false
	};
	
	if (!appData.resources) {
		appData.resources = [];
	}
	
	appData.resources.unshift(newResource);
	loadResources();
	
	// Clear form
	document.getElementById('resource-title').value = '';
	document.getElementById('resource-url').value = '';
	document.getElementById('resource-description').value = '';
	document.getElementById('resource-size').value = '';
	
	showNotification('Resource added successfully!', 'success');
}

function showNotification(message, type = 'info') {
	const colors = {
		success: 'bg-green-500',
		error: 'bg-red-500',
		info: 'bg-blue-500',
		warning: 'bg-yellow-500'
	};
	
	const notification = document.createElement('div');
	notification.className = `fixed top-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all`;
	notification.innerHTML = `
		<div class="flex items-center">
			<i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} mr-2"></i>
			<span>${message}</span>
		</div>
	`;
	
	document.body.appendChild(notification);
	
	setTimeout(() => {
		notification.style.opacity = '0';
		setTimeout(() => notification.remove(), 300);
	}, 3000);
}

// Style for filter buttons
document.addEventListener('DOMContentLoaded', () => {
	const style = document.createElement('style');
	style.textContent = `
		.filter-btn {
			border: 2px solid #1a531b;
			color: #1a531b;
		}
		.dark .filter-btn {
			border-color: #d4af37;
			color: #d4af37;
		}
		.filter-btn.active {
			background-color: #1a531b !important;
			color: white !important;
		}
		.dark .filter-btn.active {
			background-color: #d4af37 !important;
			color: #1a531b !important;
		}
	`;
	document.head.appendChild(style);
});