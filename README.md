# react 19 - KYC - form

![image](https://img.shields.io/badge/node-v22.13.1-green.svg) 
![image](https://img.shields.io/badge/react-v19-blue.svg)   
![image](https://img.shields.io/badge/typescript-blue.svg) ![image](https://img.shields.io/badge/pnpm-985F2A.svg) 

使用 React19，製作的 KYC 表單

## 功能說明
[原始題目在此](https://github.com/user-attachments/files/19782764/Frontend.2nd.Interview.Assignment_.pdf)

### Component 說明
#### Alert
- 原型為[先前 vue project](https://github.com/nayuki0115/vue3-to-do-list/blob/main/src/components/Alert.vue) 所寫的 component
- 想練習轉換成 react component
  
| 變數名稱 | 型別 | 描述 |
|:------:|:------:|-----|
| visable | boolean | Alert 顯示與否 |
| mode | string |  提供四種樣式： `warning` 、 `info` 、 `success` 、 `danger` |
| message | string | 要顯示的訊息 |
| onClose | function | 右方的關閉鈕有提供 method 可依照需求放入關閉前的行為，例如：關閉前需打 API |

### Button
![image](https://github.com/user-attachments/assets/c9142bb7-ad98-4b4f-8160-48f5e387716b)

| 變數名稱 | 型別 | 描述 |
|:------:|:------:|-----|
| variant | string |  提供三種樣式： `secondary` 、 `primary` 、 `success` |
| className | string | 除了上述三種，想客製樣式可以使用 |
| onClick | function | 按下按鈕要做的行為 |

### DatePicker
![image](https://github.com/user-attachments/assets/31bfae9e-e209-45ef-ae60-0a393fe5fc78)
| 變數名稱 | 型別 | 描述 |
|:------:|:------:|-----|
| variant | string |  提供三種樣式： `secondary` 、 `primary` 、 `success` |
| className | string | 除了上述三種，想客製樣式可以使用 |
| onClick | function | 按下按鈕要做的行為 |



## 技術需求
### 必需技術
- React 18+ 使用函數式組件
- TypeScript 用於類型定義
- 自定義設計的 UI 組件（不允許使用 UI 框架）
- 允許使用狀態管理和表單驗證包

### 使用技術
![image](https://img.shields.io/badge/react-v19-blue.svg) ![image](https://img.shields.io/badge/typescript-blue.svg)  

## 安裝和運行說明
![image](https://img.shields.io/badge/node-v22.13.1-green.svg) ![image](https://img.shields.io/badge/pnpm-985F2A.svg) 
```bash
git clone <repository-url>
cd <project-name>
pnpm install
pnpm run dev
```

## 專案結構
```tree
react19-kyc-form/
├── src/
│   ├── components/      # 共用元件
│   ├── router/          # 路由設定
│   ├── types/           # TypeScript 型別定義
│   ├── views/           # 頁面元件
│   ├── App.tsx          # 根元件
│   └── main.tsx          # 應用入口
├── public/              # 公共資源
├── index.html           # HTML 模板
├── package.json         # 套件設定
├── tsconfig.json        # TypeScript 設定
└── vite.config.ts       # Vite 設定
```
