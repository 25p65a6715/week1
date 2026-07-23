const loginPage = document.getElementById('loginPage');
const registerAccountPage = document.getElementById('registerAccountPage');
const detailsFormPage = document.getElementById('detailsFormPage');
const resultPage = document.getElementById('resultPage');

document.getElementById('goToRegister').addEventListener('click', () => {
    loginPage.style.display = 'none';
    registerAccountPage.style.display = 'block';
});

document.getElementById('goToLogin').addEventListener('click', () => {
    registerAccountPage.style.display = 'none';
    loginPage.style.display = 'block';
});

// 1. ACCOUNT REGISTRATION
document.getElementById('accountRegisterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const rollNo = document.getElementById('regRollNo').value;
    const pass = document.getElementById('regPass').value;

    if(rollNo !== pass) {
        alert("As per rules, your password must match your Roll Number.");
        return;
    }

    sessionStorage.setItem('accName', document.getElementById('regName').value);
    sessionStorage.setItem('accRollNo', rollNo);
    sessionStorage.setItem('accEmail', document.getElementById('regEmail').value);
    sessionStorage.setItem('accUser', document.getElementById('regUser').value); 
    sessionStorage.setItem('accPass', pass);

    alert("Account created successfully! You can now log in.");
    
    this.reset();
    registerAccountPage.style.display = 'none';
    loginPage.style.display = 'block';
});

// 2. LOGIN
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const enterUser = document.getElementById('loginUser').value;
    const enterPass = document.getElementById('loginPass').value;

    const savedUser = sessionStorage.getItem('accUser');
    const savedPass = sessionStorage.getItem('accPass');

    if(enterUser === savedUser && enterPass === savedPass) {
        document.getElementById('loginError').style.display = 'none';
        
        document.getElementById('resAccName').textContent = sessionStorage.getItem('accName');
        document.getElementById('resAccRoll').textContent = sessionStorage.getItem('accRollNo');
        document.getElementById('resAccEmail').textContent = sessionStorage.getItem('accEmail');
        document.getElementById('resAccUser').textContent = sessionStorage.getItem('accUser'); 

        loginPage.style.display = 'none';
        detailsFormPage.style.display = 'block';
    } else {
        document.getElementById('loginError').style.display = 'block';
    }
});

// 3. STUDENT DETAILS
document.getElementById('studentDetailsForm').addEventListener('submit', function(e) {
    e.preventDefault(); 

    document.getElementById('resMobile').textContent = document.getElementById('mobile').value;
    document.getElementById('resGender').textContent = document.querySelector('input[name="gender"]:checked').value;
    document.getElementById('resDept').textContent = document.getElementById('department').value;
    document.getElementById('resYearSem').textContent = document.getElementById('yearSem').value; 
    document.getElementById('resGrade').textContent = document.getElementById('grade').value;
    document.getElementById('resAddress').textContent = document.getElementById('address').value;

    detailsFormPage.style.display = 'none';
    resultPage.style.display = 'block';
});

// 4. GO BACK BUTTON
document.getElementById('goBackBtn').addEventListener('click', function() {
    resultPage.style.display = 'none';
    detailsFormPage.style.display = 'block';
});

// 5. SAVE DETAILS (DOWNLOAD FILE)
document.getElementById('saveFileBtn').addEventListener('click', function() {
    
    const name = document.getElementById('resAccName').textContent;
    
    const fileContent = `STUDENT PROFILE DATA\n` +
                        `====================\n` +
                        `Name: ${name}\n` +
                        `Roll No: ${document.getElementById('resAccRoll').textContent}\n` +
                        `Email: ${document.getElementById('resAccEmail').textContent}\n` +
                        `Username: ${document.getElementById('resAccUser').textContent}\n` +
                        `--------------------\n` +
                        `Mobile: ${document.getElementById('resMobile').textContent}\n` +
                        `Gender: ${document.getElementById('resGender').textContent}\n` +
                        `Dept/Branch: ${document.getElementById('resDept').textContent}\n` +
                        `Year & Sem: ${document.getElementById('resYearSem').textContent}\n` +
                        `Grade/CGPA: ${document.getElementById('resGrade').textContent}\n` +
                        `Address: ${document.getElementById('resAddress').textContent}\n`;

    const blob = new Blob([fileContent], { type: "text/plain" });
    const downloadLink = document.createElement("a");
    
    const safeFileName = name.replace(/ /g, "_") + "_Profile.txt";
    downloadLink.download = safeFileName;

    downloadLink.href = window.URL.createObjectURL(blob);
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
});
