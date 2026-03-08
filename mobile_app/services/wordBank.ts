import { api } from './api';
import { Difficulty, WordResponse } from '../types';

export const fetchWord = async (difficulty: Difficulty): Promise<WordResponse> => {
  const { data } = await api.get<WordResponse>('/word', {
    params: { difficulty },
  });
  return data;
};

export const fetchWordOfDay = async (): Promise<WordResponse> => {
  const { data } = await api.get<WordResponse>('/word-of-day');
  return data;
};
```

---

**Folder structure:**
```
services/
├── api.ts        ← axios instance, set your IP here
├── spellcheck.ts ← POST /spellcheck
└── wordBank.ts   ← GET /word and /word-of-day