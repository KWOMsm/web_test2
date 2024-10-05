// 퀴즈 질문 데이터
const quizQuestions = [
    {
        question: '조현병을 가진 사람은 범죄를 일으킬 확률이 높다.',
        options: ['예', '아니오'],
        correctAnswer: 1,
        feedback: '실제로 조현병을 가진 사람들은 범죄의 가해자보다 피해자가 되는 경우가 더 많습니다.',
        video: 'https://www.youtube.com/embed/WzjxF5EhD3Y'
    },
    {
        question: '조현병 환자는 치료를 받으면 증상을 조절할 수 있다.',
        options: ['예', '아니오'],
        correctAnswer: 0,
        feedback: '조현병은 적절한 치료를 통해 증상을 효과적으로 관리할 수 있습니다.',
        video: 'https://www.youtube.com/embed/NqS4Zc5M5r4'
    },
    {
        question: '조현병은 정신적으로 약한 사람에게만 발생한다.',
        options: ['예', '아니오'],
        correctAnswer: 1,
        feedback: '조현병은 여러 요인이 복합적으로 작용하여 발생하는 질환입니다.',
        video: 'https://www.youtube.com/embed/F9kXe6LQ0sU'
    },
    {
        question: '조현병 환자와 대화를 하는 것은 위험하다.',
        options: ['예', '아니오'],
        correctAnswer: 1,
        feedback: '대화를 통해 이해와 공감을 쌓는 것이 중요합니다. 대부분의 조현병 환자들은 안전하게 대화할 수 있습니다.',
        video: 'https://www.youtube.com/embed/XTlnD5EKQZ8'
    }
];

let currentQuestionIndex = 0;
let score = 0;

document.addEventListener('DOMContentLoaded', function() {
    // 네비게이션 이벤트 리스너 추가
    document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo(this.id.replace('Link', ''));
        });
    });

    // 퀴즈 시작 버튼 이벤트 리스너
    document.getElementById('startButton').addEventListener('click', function() {
        navigateTo('quiz');
    });

    // 초기 페이지 로드
    navigateTo('home');
});

function navigateTo(sectionId) {
    // 모든 섹션 숨기기
    document.querySelectorAll('main > section').forEach(section => {
        section.style.display = 'none';
    });

    // 선택된 섹션 보이기
    document.getElementById(sectionId).style.display = 'block';

    // 섹션별 콘텐츠 로드
    switch(sectionId) {
        case 'home':
            // 홈 페이지 내용은 이미 HTML에 있으므로 추가 작업 불필요
            break;
        case 'quiz':
            loadQuiz();
            break;
        case 'info':
            loadInfoCenter();
            break;
        case 'experience':
            loadExperienceSharing();
            break;
        case 'resources':
            loadResources();
            break;
        case 'contact':
            loadContact();
            break;
    }
}

function loadQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    const quizContent = document.getElementById('quizContent');
    if (currentQuestionIndex < quizQuestions.length) {
        const question = quizQuestions[currentQuestionIndex];
        quizContent.innerHTML = `
            <h3>질문 ${currentQuestionIndex + 1}</h3>
            <p>${question.question}</p>
            <div class="quiz-options">
                ${question.options.map((option, index) => 
                    `<button onclick="submitAnswer(${index})">${option}</button>`
                ).join('')}
            </div>
            <div class="progress">질문 ${currentQuestionIndex + 1} / ${quizQuestions.length}</div>
            <div id="feedback"></div>
            <div id="video-container"></div>
        `;
    } else {
        showResults();
    }
}

function submitAnswer(selectedIndex) {
    const question = quizQuestions[currentQuestionIndex];
    const result = evaluateAnswer(selectedIndex, question);
    const quizContent = document.getElementById('quizContent');
    
    // 피드백과 비디오 업데이트
    updateFeedback(result, question);
    
    // 다음 질문 버튼 추가 (이미 존재하지 않는 경우에만)
    if (!document.querySelector('.next-question-button')) {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            const nextButton = document.createElement('button');
            nextButton.textContent = '다음 질문';
            nextButton.classList.add('next-question-button');
            nextButton.onclick = nextQuestion;
            quizContent.appendChild(nextButton);
        } else {
            const finishButton = document.createElement('button');
            finishButton.textContent = '결과 보기';
            finishButton.classList.add('next-question-button');
            finishButton.onclick = showResults;
            quizContent.appendChild(finishButton);
        }
    }

    // 답변 버튼 활성화 상태 유지
    document.querySelectorAll('.quiz-options button').forEach(button => {
        button.disabled = false;
    });
}

function updateFeedback(result, question) {
    const feedbackElement = document.getElementById('feedback');
    const videoContainer = document.getElementById('video-container');

    feedbackElement.innerHTML = `
        <div class="feedback ${result.isCorrect ? 'correct' : 'incorrect'}">
            <p><strong>피드백:</strong> ${result.feedback}</p>
        </div>
    `;
    videoContainer.innerHTML = `
        <div class="video-container">
            <iframe width="560" height="315" src="${question.video}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
    `;
}

function evaluateAnswer(selectedIndex, question) {
    if (selectedIndex === question.correctAnswer) {
        score++;
        return {
            isCorrect: true,
            feedback: '정답입니다! ' + question.feedback
        };
    } else {
        return {
            isCorrect: false,
            feedback: '아쉽습니다. ' + question.feedback
        };
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    showQuestion();
}

function showResults() {
    const quizContent = document.getElementById('quizContent');
    quizContent.innerHTML = `
        <h3>퀴즈 완료</h3>
        <p>당신의 점수: ${score} / ${quizQuestions.length}</p>
        <p>조현병에 대한 인식 개선에 참여해 주셔서 감사합니다.</p>
        <p>조현병에 대한 올바른 이해는 사회적 편견을 줄이고 환자들의 삶의 질을 향상시키는 데 중요합니다.</p>
        <button onclick="loadQuiz()">다시 시작</button>
    `;
}

function loadInfoCenter() {
    const infoContent = document.getElementById('infoContent');
    infoContent.innerHTML = `
        <h3>조현병에 대한 추가 자료</h3>
        <p>조현병은 정신 건강의 복잡한 영역입니다. 더 자세한 정보를 제공하는 것이 중요합니다.</p>

        <h4>조현병 치료법</h4>
        <ul>
            <li><strong>약물치료:</strong> 항정신병 약물을 통해 증상을 조절합니다.</li>
            <li><strong>심리치료:</strong> 인지행동 치료 및 가족 치료를 포함합니다.</li>
            <li><strong>재활 프로그램:</strong> 환자의 생활 안전성을 높이는 훈련 프로그램입니다.</li>
        </ul>

        <h4>조현병 환자에 대한 지원</h4>
        <p>환자들은 전문의와 상담하여 필요할 경우 지속적인 치료를 받아야 합니다. 환자와 그 가족에게 유용한 리소스를 제공하는 것이 중요합니다.</p>

        <h4>조현병 관련 자료</h4>
        <ul>
            <li><a href='https://www.nami.org/' target='_blank'>NAMI (National Alliance on Mental Illness)</a>: 정신 건강 문제에 대한 정보 제공 및 지원 그룹</li>
            <li><a href='https://www.nimh.nih.gov/' target='_blank'>NIMH (National Institute of Mental Health)</a>: 정신 질환에 대한 연구 및 치료법</li>
        </ul>
    `;
}

function loadExperienceSharing() {
    const experienceContent = document.getElementById('experienceContent');
    experienceContent.innerHTML = `
        <h3>경험 공유하기</h3>
        <textarea id='userExperience' placeholder='당신의 경험을 공유해주세요...'></textarea>
        <button onclick='submitExperience()'>공유하기</button>
        <div id='sharedExperiences'></div>
    `;
    loadSharedExperiences();
}

function submitExperience() {
    const experience = document.getElementById('userExperience').value;
    if (experience) {
        const experiences = JSON.parse(localStorage.getItem('experiences') || '[]');
        experiences.push(experience);
        localStorage.setItem('experiences', JSON.stringify(experiences));
        document.getElementById('userExperience').value = '';
        loadSharedExperiences();
    }
}

function loadSharedExperiences() {
    const experiences = JSON.parse(localStorage.getItem('experiences') || '[]');
    const sharedExperiences = document.getElementById('sharedExperiences');
    sharedExperiences.innerHTML = experiences.map(exp => `<p>${exp}</p>`).join('');
}

function loadResources() {
    const resourcesContent = document.getElementById('resourcesContent');
    resourcesContent.innerHTML = `
        <h3>추천 도서</h3>
        <ul>
            <li>조현병의 이해와 치료 - 저자: 김영훈</li>
            <li>마음의 문을 열다 - 저자: 이지연</li>
        </ul>
        <h3>유용한 웹사이트</h3>
        <ul>
            <li><a href='https://www.nami.org/' target='_blank'>National Alliance on Mental Illness</a></li>
            <li><a href='https://www.nimh.nih.gov/' target='_blank'>National Institute of Mental Health</a></li>
        </ul>
    `;
}

function loadContact() {
    const contactContent = document.getElementById('contactContent');
    contactContent.innerHTML = `
        <h3>도움이 필요하신가요?</h3>
        <p>전문가와 상담이 필요하시다면 아래 연락처로 문의해주세요:</p>
        <p>전화: 1577-0199 (정신건강 상담전화)</p>
        <p>이메일: support@mentalhealth.org</p>
    `;
}