document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('card-grid');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close-modal');
    const form = document.getElementById('card-form');
    const deleteButton = document.getElementById('delete-card');
    const imageSelect = document.getElementById('image-select'); // select 요소를 가져옵니다.
    let currentCardId = null;

    // 동물 사진 목록 불러오기
    fetch('/images')
        .then(response => response.json())
        .then(images => {
            images.forEach(image => {
                const option = document.createElement('option');
                option.value = image.replace('.jpg', '');
                option.textContent = image.replace('.jpg', '');
                imageSelect.appendChild(option);
            });
        })
        .catch(error => console.error('이미지 로딩 중 오류 발생:', error));

    // 카드 목록 불러오기
    function loadCards() {
        fetch('/api/cards')
            .then(response => response.json())
            .then(cards => {
                grid.innerHTML = '';
                for (let i = 0; i < 30; i++) {
                    const cardData = cards[i];
                    const cardDiv = document.createElement('div');
                    cardDiv.className = 'card';
                    cardDiv.dataset.id = i;

                    if (cardData) {
                        // 카드에 hover 효과를 위한 클래스 추가
                        cardDiv.classList.add('filled-card');

                        cardDiv.innerHTML = `
                            <div class="card-header">
                                <span class="card-number">#${i}</span>
                                <span class="card-maker">${cardData.maker}</span>
                            </div>
                            ${cardData.image ?
                                `<div class="card-image-container">
                                    <img src="/images/${cardData.image}" alt="${cardData.name}">
                                </div>` :
                                '<div class="no-image">🖼️</div>'
                            }
                            <div class="card-body">
                                <h3 class="animal-name">${cardData.name}</h3>
                                <p class="animal-features">${cardData.features}</p>
                            </div>
                        `;
                    } else {
                        cardDiv.classList.add('empty-card');
                        cardDiv.innerHTML = `
                            <div class="empty-card-content">
                                <span class="plus-icon">+</span>
                                <p>새로운 동물 카드를<br>추가해보세요!</p>
                            </div>
                        `;
                    }

                    cardDiv.addEventListener('click', () => openModal(i, cardData));
                    grid.appendChild(cardDiv);
                }
            })
            .catch(error => {
                console.error('카드 로딩 중 오류 발생:', error);
                grid.innerHTML = '<div class="error-message">카드를 불러오는 중 문제가 발생했습니다. 새로고침을 시도해주세요.</div>';
            });
    }

    // 모달 열기: 카드 id와 기존 데이터를 전달
    function openModal(id, data) {
        currentCardId = id;
        document.getElementById('card-id').value = id;
        document.getElementById('maker').value = data ? data.maker : '';
        document.getElementById('card-name').value = data ? data.name : '';
        document.getElementById('card-features').value = data ? data.features : '';
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
        const maker = document.getElementById('maker').value;
        const name = document.getElementById('card-name').value;
        const features = document.getElementById('card-features').value;
        const selectedImage = imageSelect.value; // 선택된 이미지 값 사용

        const cardData = {
            maker,
            name,
            features,
            image: selectedImage
        };

        fetch('/api/cards/' + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cardData)
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
