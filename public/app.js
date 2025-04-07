document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('card-grid');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close-modal');
    const form = document.getElementById('card-form');
    const deleteButton = document.getElementById('delete-card');
    let currentCardId = null;

    // 카드 목록 불러오기
    function loadCards() {
        fetch('/api/cards')
            .then(response => response.json())
            .then(cards => {
                grid.innerHTML = '';
                // 32칸(4x8) 생성
                for (let i = 0; i < 32; i++) {
                    const cardData = cards[i];
                    const cardDiv = document.createElement('div');
                    cardDiv.className = 'card';
                    cardDiv.dataset.id = i;
                    if (cardData) {
                        cardDiv.innerHTML = `
                <strong>${cardData.name}</strong>
                ${cardData.image ? `<img src="${cardData.image.data}" alt="Animal Image">` : ''}
                <p>${cardData.features}</p>
              `;
                    } else {
                        cardDiv.innerHTML = `<em>빈 카드</em>`;
                    }
                    cardDiv.addEventListener('click', () => openModal(i, cardData));
                    grid.appendChild(cardDiv);
                }
            });
    }

    // 모달 열기: 카드 id와 기존 데이터를 전달
    function openModal(id, data) {
        currentCardId = id;
        document.getElementById('card-id').value = id;
        document.getElementById('card-name').value = data ? data.name : '';
        document.getElementById('card-features').value = data ? data.features : '';
        // 파일 입력 초기화
        document.getElementById('card-image').value = '';
        modal.style.display = 'block';
    }

    function closeModalFunc() {
        modal.style.display = 'none';
    }

    closeModal.addEventListener('click', closeModalFunc);
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModalFunc();
        }
    });

    // 카드 등록/수정
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('card-id').value;
        const name = document.getElementById('card-name').value;
        const features = document.getElementById('card-features').value;
        const imageInput = document.getElementById('card-image');
        const formData = new FormData();
        formData.append('name', name);
        formData.append('features', features);
        if (imageInput.files[0]) {
            formData.append('image', imageInput.files[0]);
        }
        fetch('/api/cards/' + id, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(() => {
                loadCards();
                closeModalFunc();
            });
    });

    // 카드 삭제
    deleteButton.addEventListener('click', () => {
        const id = document.getElementById('card-id').value;
        fetch('/api/cards/' + id, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(() => {
                loadCards();
                closeModalFunc();
            });
    });

    loadCards();
});
