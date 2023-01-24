echo "=============== Rebuild images ==============="
docker build -t frontend ./frontend --platform linux/amd64
docker build -t user-service ./backend/userservice --platform linux/amd64
docker build -t draft-service ./backend/draftservice --platform linux/amd64
docker build -t published-service ./backend/publishedservice --platform linux/amd64

echo "=============== Tag images ==============="
docker tag frontend clarence98/frontend-amd64
docker tag user-service clarence98/user-service-amd64
docker tag draft-service clarence98/draft-service-amd64
docker tag published-service clarence98/published-service-amd64

echo "=============== Push images ==============="
docker push clarence98/frontend-amd64
docker push clarence98/user-service-amd64
docker push clarence98/draft-service-amd64
docker push clarence98/published-service-amd64