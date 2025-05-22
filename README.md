This repo using subtree to add frontend and backend

## License
This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 1/ Create repo

## 2/ Add repo frontend and backend in subtree form

	Frontend:

```bash
git remote add frontend https://github.com/youruser/frontend.git
git fetch frontend
git subtree add --prefix=frontend frontend main
```

	Backend:

```bash
git remote add backend https://github.com/youruser/backend.git
git fetch backend
git subtree add --prefix=backend backend main
```

## 3/ Update from the original repo

```bash
Frontend: git subtree pull --prefix=frontend frontend main
Backend: git subtree pull --prefix=backend backend main
```

## 4: (Tuỳ chọn) Push ngược trở lại repo gốc
Nếu bạn sửa trong frontend/ trong project-all và muốn push ngược lại repo frontend:

```bash
  git subtree push --prefix=frontend frontend main
```

⚠️ Bạn phải có quyền push vào repo frontend.

