This repo using subtree to add frontend and backend
1/ Create repo

2/ Add repo frontend and backend in subtree form
  Frontend:
git remote add frontend https://github.com/youruser/frontend.git
git fetch frontend
git subtree add --prefix=frontend frontend main
  Backend:
git remote add backend https://github.com/youruser/backend.git
git fetch backend
git subtree add --prefix=backend backend main

3/ Update from the original repo
Frontend: git subtree pull --prefix=frontend frontend main
Backend: git subtree pull --prefix=backend backend main

4: (Tuỳ chọn) Push ngược trở lại repo gốc
Nếu bạn sửa trong frontend/ trong project-all và muốn push ngược lại repo frontend:
  git subtree push --prefix=frontend frontend main
⚠️ Bạn phải có quyền push vào repo frontend.

