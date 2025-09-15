
let currentUser = null;
let currentRole = null;

const mockAttendanceData = [
    { date: '2024-01-15', subject: 'Mathematics', status: 'Present', time: '09:00 AM' },
    { date: '2024-01-16', subject: 'Physics', status: 'Absent', time: '10:00 AM' },
    { date: '2024-01-17', subject: 'Chemistry', status: 'Late', time: '09:15 AM' },
    { date: '2024-01-18', subject: 'English', status: 'Present', time: '11:00 AM' },
    { date: '2024-01-19', subject: 'Computer Science', status: 'Present', time: '02:00 PM' }
];

let mockStudents = [
    { id: 1, name: 'John Doe', email: 'john@example.com', class: '12A', rollNumber: '001' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', class: '12A', rollNumber: '002' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', class: '12B', rollNumber: '003' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', class: '12A', rollNumber: '004' }
];

let mockCorrectionRequests = [
    { id: 1, studentName: 'John Doe', date: '2024-01-16', subject: 'Physics', reason: 'Was present but marked absent', status: 'Pending' },
    { id: 2, studentName: 'Jane Smith', date: '2024-01-17', subject: 'Chemistry', reason: 'Late due to traffic', status: 'Approved' },
    { id: 3, studentName: 'Mike Johnson', date: '2024-01-18', subject: 'English', reason: 'Technical issue with system', status: 'Pending' }
];

document.addEventListener('DOMContentLoaded', function() {
   
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    showPage('loginPage');
});

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.querySelector('input[name="role"]:checked');
    
    if (username && password && role) {
        currentUser = { username: username, password: password };
        currentRole = role.value;
        
        if (currentRole === 'student') {
            document.getElementById('studentName').textContent = currentUser.username;
            showPage('studentDashboard');
        } else if (currentRole === 'teacher') {
            document.getElementById('teacherName').textContent = currentUser.username;
            showPage('teacherDashboard');
        }
    } else {
        alert('Please fill in all fields and select a role');
    }
}

function selectRole(role) {
    currentRole = role;
    
    if (role === 'student') {
        document.getElementById('studentName').textContent = currentUser.username;
        showPage('studentDashboard');
    } else if (role === 'teacher') {
        document.getElementById('teacherName').textContent = currentUser.username;
        showPage('teacherDashboard');
    }
}
function showPage(pageId) {
  
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    document.getElementById(pageId).classList.add('active');
    
    const activePage = document.getElementById(pageId);
    activePage.classList.add('fade-in');
}

function goBack() {
    showPage('loginPage');
    currentUser = null;
    currentRole = null;
}

function logout() {
    currentUser = null;
    currentRole = null;
    showPage('loginPage');
    
    document.getElementById('loginForm').reset();
}

function showAttendance() {
    const content = document.getElementById('studentContent');
    content.innerHTML = `
        <h2>Your Attendance Records</h2>
        <div class="attendance-summary">
            <div class="summary-card">
                <h3>Total Classes</h3>
                <span class="number">${mockAttendanceData.length}</span>
            </div>
            <div class="summary-card">
                <h3>Present</h3>
                <span class="number present">${mockAttendanceData.filter(a => a.status === 'Present').length}</span>
            </div>
            <div class="summary-card">
                <h3>Absent</h3>
                <span class="number absent">${mockAttendanceData.filter(a => a.status === 'Absent').length}</span>
            </div>
            <div class="summary-card">
                <h3>Late</h3>
                <span class="number late">${mockAttendanceData.filter(a => a.status === 'Late').length}</span>
            </div>
        </div>
        <div class="table-responsive">
            <table class="attendance-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Subject</th>
                        <th>Status</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    ${mockAttendanceData.map(record => `
                        <tr>
                            <td>${record.date}</td>
                            <td>${record.subject}</td>
                            <td class="status-${record.status.toLowerCase()}">${record.status}</td>
                            <td>${record.time}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    const style = document.createElement('style');
    style.textContent = `
        .attendance-summary {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        .summary-card {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
        }
        .summary-card h3 {
            margin-bottom: 10px;
            color: #666;
            font-size: 0.9rem;
        }
        .summary-card .number {
            font-size: 2rem;
            font-weight: bold;
        }
        .summary-card .number.present { color: #28a745; }
        .summary-card .number.absent { color: #dc3545; }
        .summary-card .number.late { color: #ffc107; }
    `;
    document.head.appendChild(style);
}

function showCorrectionRequests() {
    const content = document.getElementById('studentContent');
    content.innerHTML = `
        <h2>Correction Requests</h2>
        <div class="request-form">
            <h3>Submit New Request</h3>
            <form id="correctionForm">
                <div class="form-group">
                    <label for="requestDate">Date</label>
                    <input type="date" id="requestDate" required>
                </div>
                <div class="form-group">
                    <label for="requestSubject">Subject</label>
                    <select id="requestSubject" required>
                        <option value="">Select Subject</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="English">English</option>
                        <option value="Computer Science">Computer Science</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="requestReason">Reason</label>
                    <textarea id="requestReason" placeholder="Explain why you need this correction..." required></textarea>
                </div>
                <button type="submit" class="btn">Submit Request</button>
            </form>
        </div>
        <div class="request-history">
            <h3>Your Previous Requests</h3>
            <div class="table-responsive">
                <table class="attendance-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Subject</th>
                            <th>Reason</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${mockCorrectionRequests.map(request => `
                            <tr>
                                <td>${request.date}</td>
                                <td>${request.subject}</td>
                                <td>${request.reason}</td>
                                <td class="status-${request.status.toLowerCase()}">${request.status}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
    
    document.getElementById('correctionForm').addEventListener('submit', handleCorrectionRequest);
}

function handleCorrectionRequest(e) {
    e.preventDefault();
    
    const date = document.getElementById('requestDate').value;
    const subject = document.getElementById('requestSubject').value;
    const reason = document.getElementById('requestReason').value;
    
    alert('Correction request submitted successfully!');
    
    document.getElementById('correctionForm').reset();
}

function showCorrectionApproval() {
    const content = document.getElementById('teacherContent');
    content.innerHTML = `
        <h2>Correction Request Management</h2>
        <div class="table-responsive">
            <table class="attendance-table">
                <thead>
                    <tr>
                        <th>Student</th>
                        <th>Date</th>
                        <th>Subject</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${mockCorrectionRequests.map(request => `
                        <tr>
                            <td>${request.studentName}</td>
                            <td>${request.date}</td>
                            <td>${request.subject}</td>
                            <td>${request.reason}</td>
                            <td class="status-${request.status.toLowerCase()}">${request.status}</td>
                            <td>
                                ${request.status === 'Pending' ? `
                                    <button class="btn" onclick="approveRequest(${request.id})">Approve</button>
                                    <button class="btn btn-secondary" onclick="declineRequest(${request.id})">Decline</button>
                                ` : 'Processed'}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function approveRequest(requestId) {
    const idx = mockCorrectionRequests.findIndex(r => r.id === requestId);
    if (idx !== -1) {
        mockCorrectionRequests[idx].status = 'Approved';
    }
    alert('Request approved successfully!');
    showCorrectionApproval(); 
}

function declineRequest(requestId) {
    const idx = mockCorrectionRequests.findIndex(r => r.id === requestId);
    if (idx !== -1) {
        mockCorrectionRequests[idx].status = 'Declined';
    }
    alert('Request declined.');
    showCorrectionApproval(); 
}

function showRealTimeMonitoring() {
    const content = document.getElementById('teacherContent');
    content.innerHTML = `
        <h2>Real-time Attendance Monitoring</h2>
        <div class="monitoring-container">
            <div class="class-info">
                <h3>Current Class: Computer Science</h3>
                <p>Time: 2:00 PM - 3:00 PM</p>
                <p>Total Students: ${mockStudents.length}</p>
            </div>
            <div class="attendance-status">
                <h3>Attendance Status</h3>
                <div class="status-grid">
                    <div class="status-item present">
                        <i class="fas fa-check-circle"></i>
                        <span>Present: 3</span>
                    </div>
                    <div class="status-item absent">
                        <i class="fas fa-times-circle"></i>
                        <span>Absent: 1</span>
                    </div>
                </div>
            </div>
            <div class="face-recognition-section">
                <h3>Face Recognition System</h3>
                <button class="btn" onclick="openFaceRecognition()">Start Face Recognition</button>
                <p>Click to activate the face recognition system for automatic attendance marking.</p>
            </div>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .monitoring-container {
            display: grid;
            gap: 30px;
        }
        .class-info, .attendance-status, .face-recognition-section {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
        }
        .status-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
            margin-top: 15px;
        }
        .status-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 15px;
            border-radius: 8px;
        }
        .status-item.present {
            background: #d4edda;
            color: #155724;
        }
        .status-item.absent {
            background: #f8d7da;
            color: #721c24;
        }
    `;
    document.head.appendChild(style);
}

function showGenerateReport() {
    const content = document.getElementById('teacherContent');
    content.innerHTML = `
        <h2>Generate Attendance Report</h2>
        <div class="report-form">
            <form id="reportForm">
                <div class="form-group">
                    <label for="reportClass">Class</label>
                    <select id="reportClass" required>
                        <option value="">Select Class</option>
                        <option value="12A">12A</option>
                        <option value="12B">12B</option>
                        <option value="12C">12C</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="reportSubject">Subject</label>
                    <select id="reportSubject" required>
                        <option value="">Select Subject</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Physics">Physics</option>
                        <option value="Chemistry">Chemistry</option>
                        <option value="English">English</option>
                        <option value="Computer Science">Computer Science</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="reportStartDate">Start Date</label>
                    <input type="date" id="reportStartDate" required>
                </div>
                <div class="form-group">
                    <label for="reportEndDate">End Date</label>
                    <input type="date" id="reportEndDate" required>
                </div>
                <button type="submit" class="btn">Generate Report</button>
            </form>
        </div>
        <div class="report-preview" id="reportPreview" style="display: none;">
            <h3>Report Preview</h3>
            <div class="report-content">
                <p>Report would be generated here...</p>
            </div>
        </div>
    `;
    
    
    document.getElementById('reportForm').addEventListener('submit', handleReportGeneration);
}

function handleReportGeneration(e) {
    e.preventDefault();
    
    const reportClass = document.getElementById('reportClass').value;
    const reportSubject = document.getElementById('reportSubject').value;
    const startDate = document.getElementById('reportStartDate').value;
    const endDate = document.getElementById('reportEndDate').value;
    
    
    document.getElementById('reportPreview').style.display = 'block';
    
   
    alert('Report generated successfully!');
}

function showStudentManagement() {
    const content = document.getElementById('teacherContent');
    content.innerHTML = `
        <h2>Student Management</h2>
        <div class="student-actions">
            <button class="btn" onclick="showAddStudentForm()">Add New Student</button>
        </div>
        <div class="table-responsive">
            <table class="attendance-table">
                <thead>
                    <tr>
                        <th>Roll Number</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Class</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${mockStudents.map(student => `
                        <tr>
                            <td>${student.rollNumber}</td>
                            <td>${student.name}</td>
                            <td>${student.email}</td>
                            <td>${student.class}</td>
                            <td>
                                <button class="btn" onclick="editStudent(${student.id})">Edit</button>
                                <button class="btn btn-secondary" onclick="deleteStudent(${student.id})">Delete</button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function showAddStudentForm() {
    const content = document.getElementById('teacherContent');
    content.innerHTML = `
        <h2>Add New Student</h2>
        <form id="addStudentForm" class="form-container">
            <div class="form-group">
                <label for="studentName">Full Name</label>
                <input type="text" id="studentName" required>
            </div>
            <div class="form-group">
                <label for="studentEmail">Email</label>
                <input type="email" id="studentEmail" required>
            </div>
            <div class="form-group">
                <label for="studentClass">Class</label>
                <select id="studentClass" required>
                    <option value="">Select Class</option>
                    <option value="12A">12A</option>
                    <option value="12B">12B</option>
                    <option value="12C">12C</option>
                </select>
            </div>
            <div class="form-group">
                <label for="studentRoll">Roll Number</label>
                <input type="text" id="studentRoll" required>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn">Add Student</button>
                <button type="button" class="btn btn-secondary" onclick="showStudentManagement()">Cancel</button>
            </div>
        </form>
    `;
    
    document.getElementById('addStudentForm').addEventListener('submit', handleAddStudent);
}

function handleAddStudent(e) {
    e.preventDefault();
    
    const name = document.getElementById('studentName').value;
    const email = document.getElementById('studentEmail').value;
    const studentClass = document.getElementById('studentClass').value;
    const rollNumber = document.getElementById('studentRoll').value;
    
    const newId = mockStudents.length ? Math.max(...mockStudents.map(s => s.id)) + 1 : 1;
    mockStudents.push({ id: newId, name, email, class: studentClass, rollNumber });
    alert('Student added successfully!');
    showStudentManagement(); 
}

function editStudent(studentId) {
    const student = mockStudents.find(s => s.id === studentId);
    if (!student) return;
    const content = document.getElementById('teacherContent');
    content.innerHTML = `
        <h2>Edit Student</h2>
        <form id="editStudentForm" class="form-container">
            <div class="form-group">
                <label for="editStudentName">Full Name</label>
                <input type="text" id="editStudentName" value="${student.name}" required>
            </div>
            <div class="form-group">
                <label for="editStudentEmail">Email</label>
                <input type="email" id="editStudentEmail" value="${student.email}" required>
            </div>
            <div class="form-group">
                <label for="editStudentClass">Class</label>
                <select id="editStudentClass" required>
                    <option value="">Select Class</option>
                    <option value="12A" ${student.class === '12A' ? 'selected' : ''}>12A</option>
                    <option value="12B" ${student.class === '12B' ? 'selected' : ''}>12B</option>
                    <option value="12C" ${student.class === '12C' ? 'selected' : ''}>12C</option>
                </select>
            </div>
            <div class="form-group">
                <label for="editStudentRoll">Roll Number</label>
                <input type="text" id="editStudentRoll" value="${student.rollNumber}" required>
            </div>
            <div class="form-actions">
                <button type="submit" class="btn">Save Changes</button>
                <button type="button" class="btn btn-secondary" onclick="showStudentManagement()">Cancel</button>
            </div>
        </form>
    `;

    document.getElementById('editStudentForm').addEventListener('submit', function(e){
        e.preventDefault();
        student.name = document.getElementById('editStudentName').value;
        student.email = document.getElementById('editStudentEmail').value;
        student.class = document.getElementById('editStudentClass').value;
        student.rollNumber = document.getElementById('editStudentRoll').value;
        alert('Student updated successfully!');
        showStudentManagement();
    });
}

function deleteStudent(studentId) {
    if (confirm('Are you sure you want to delete this student?')) {
        mockStudents = mockStudents.filter(s => s.id !== studentId);
        alert('Student deleted successfully!');
        showStudentManagement(); 
    }
}

function openFaceRecognition() {
    document.getElementById('faceRecognitionModal').style.display = 'block';
    

    setTimeout(() => {
        const statusElement = document.getElementById('recognitionStatus');
        statusElement.innerHTML = '<i class="fas fa-check-circle"></i><span>Face recognized! Attendance marked.</span>';
        statusElement.style.background = '#d4edda';
        statusElement.style.color = '#155724';
    }, 3000);
}

function closeModal() {
    document.getElementById('faceRecognitionModal').style.display = 'none';
    
   
    const statusElement = document.getElementById('recognitionStatus');
    statusElement.innerHTML = '<i class="fas fa-search"></i><span>Scanning for face...</span>';
    statusElement.style.background = '#e3f2fd';
    statusElement.style.color = '#1976d2';
}

window.onclick = function(event) {
    const modal = document.getElementById('faceRecognitionModal');
    if (event.target === modal) {
        closeModal();
    }
}
