document.addEventListener("DOMContentLoaded", function() {
    const content = document.getElementById('content');
    const loading = document.getElementById('loading');
    let loadingFlag = false;
    let page = 1;

    async function loadMoreGames() {
        if (loadingFlag) return;
        loadingFlag = true;
        loading.style.display = 'block';

        // 從伺服器獲取更多遊戲數據
        const response = await fetch(`/games?page=${page}`);
        const games = await response.json();

        games.forEach(game => {
            const gameItem = document.createElement('div');
            gameItem.className = 'game-item';
            const gameId = `game-${game.id}`;
            gameItem.innerHTML = `
                <h2>${game.name}</h2>
                <iframe src="${game.url}" width="100%" height="600" frameborder="0" allowfullscreen></iframe>
                <div class="like-section">
                    <button class="like-button" data-game-id="${gameId}">Like</button>
                    <span class="like-count" id="${gameId}-likes">${game.likes} Likes</span>
                </div>
                <div class="comments">
                    <h3>Comments</h3>
                    <div id="${gameId}-comments">
                        ${game.comments.map(comment => `<div class="comment">${comment}</div>`).join('')}
                    </div>
                    <input type="text" class="comment-input" data-game-id="${gameId}" placeholder="Add a comment">
                </div>
            `;
            content.appendChild(gameItem);
        });

        page++;
        loadingFlag = false;
        loading.style.display = 'none';
    }

    // 初始化載入一些遊戲
    loadMoreGames();

    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loadingFlag) {
            loadMoreGames();
        }
    });

    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('like-button')) {
            const gameId = event.target.getAttribute('data-game-id');
            const likeCountSpan = document.getElementById(`${gameId}-likes`);
            let likeCount = parseInt(likeCountSpan.textContent);
            likeCountSpan.textContent = `${++likeCount} Likes`;

            // 模擬將按讚數據發送到後端
            fetch('/like', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ gameId: gameId })
            }).then(response => response.json()).then(data => {
                console.log('Like recorded:', data);
            }).catch(error => {
                console.error('Error:', error);
            });
        }
    });

    document.addEventListener('keypress', (event) => {
        if (event.target.classList.contains('comment-input') && event.key === 'Enter') {
            const gameId = event.target.getAttribute('data-game-id');
            const commentText = event.target.value;
            const commentsDiv = document.getElementById(`${gameId}-comments`);
            
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment';
            commentDiv.textContent = commentText;
            commentsDiv.appendChild(commentDiv);

            // 清空輸入框
            event.target.value = '';

            // 模擬將留言數據發送到後端
            fetch('/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ gameId: gameId, comment: commentText })
            }).then(response => response.json()).then(data => {
                console.log('Comment recorded:', data);
            }).catch(error => {
                console.error('Error:', error);
            });
        }
    });
});
