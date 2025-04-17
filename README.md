# react 19 - KYC - form

![image](https://img.shields.io/badge/node-v22.13.1-green.svg) 
![image](https://img.shields.io/badge/react-v19-blue.svg)   
![image](https://img.shields.io/badge/typescript-blue.svg) ![image](https://img.shields.io/badge/pnpm-985F2A.svg) 

使用 React19，製作的 KYC 表單

## 功能說明
[原始題目在此](https://github.com/user-attachments/files/19782764/Frontend.2nd.Interview.Assignment_.pdf)

### Component 說明
#### Alert
![image](https://github.com/user-attachments/assets/b3d7f68c-3bc3-4bc2-ae01-58ac3de8cd72)  
- 顯示提示訊息
- 原型為[先前 vue project](https://github.com/nayuki0115/vue3-to-do-list/blob/main/src/components/Alert.vue) 所寫的 component
- 想練習轉換成 react component
  
| 變數名稱 | 型別 | 必填 | 描述 |
|:------:|:------:|:-----:| ----- |
| visable | boolean | ✓ | Alert 顯示與否 |
| mode | string | ✓ | 提供四種樣式： `warning` 、 `info` 、 `success` 、 `danger` |
| message | string | ✓ | 要顯示的訊息 |
| onClose | function |  | 右方的關閉鈕有提供 method 可依照需求放入關閉前的行為，例如：關閉前需打 API |

#### Button
![image](https://github.com/user-attachments/assets/c9142bb7-ad98-4b4f-8160-48f5e387716b)  
- 按鈕

| 變數名稱 | 型別 | 必填 | 描述 |
|:------:|:------:|:-----:| ----- |
| variant | string | ✓ | 提供三種樣式： `secondary` 、 `primary` 、 `success` |
| className | string | ✓ | 除了上述三種，想客製樣式可以使用 |
| children | any | ✓ | 被夾在 component 標籤之間的任何內容，可以是文字、html 等等 |
| onClick | function |  | 按下按鈕要做的行為 |

### DatePicker
![image](https://github.com/user-attachments/assets/31bfae9e-e209-45ef-ae60-0a393fe5fc78)  
- 日期選擇器
  
| 變數名稱 | 型別 | 必填 | 描述 |
|:------:|:------:|:------:|-----|
| label | string | ✓ | 日期選擇器的標籤文字，會顯示在輸入框上方 |
| id | string | ✓ | 日期選擇器的唯一識別碼，用於連結 label 和 input 元素 |
| name | string | ✓ | 輸入框的 name 屬性，用於表單提交 |
| value | string |  | 日期選擇器當前的值，格式為日期字串 |
| onChange | function |  | 當日期值改變時呼叫的回調函式，參數為新的日期字串 |
| required | boolean |  | 是否為必填欄位 |
| errorMessage | string |  | 顯示的錯誤訊息 |
| validationRules | function[] |  | 驗證規則陣列，每個函式接收日期字串並返回錯誤訊息或 undefined |
| onValidationResult | function |  | 驗證結果回調函式，參數包含驗證是否通過及可選的錯誤訊息 |

### FileUpload
![image](https://github.com/user-attachments/assets/515389ef-e142-4507-adf6-10c62a234541)  
- 單選的檔案上傳器
- 選擇檔案之後會顯示已選檔案

| 變數名稱 | 型別 | 必填 | 描述 |
|:------:|:------:|:-----:|-----|
| label | string | ✓ | 檔案上傳器的標籤文字 |
| id | string | ✓ | 檔案上傳器的唯一識別碼 |
| name | string | ✓ | 輸入框的 name 屬性 |
| onFileChange | function | ✓ | 檔案選擇改變時呼叫的回調函式，參數為 File 或 null |
| accept | string |  | 可接受的 MIME 檔案類型，如 'image/jpeg, image/png	,application/pdf' |
| acceptText | string |  | 顯示給使用者的可接受檔案類型文字說明，如 '.jpg,.png,.pdf' |
| maxSizeMB | number |  | 檔案大小限制（單位：MB） |
| preview | boolean |  | 是否顯示檔案預覽（圖片） |
| required | boolean |  | 是否為必填欄位 |
| errorMessage | string |  | 顯示的錯誤訊息 |
| fileInfo | uploadFileInfo |   | 當前已上傳檔案的資訊 |

uploadFileInfo   
| 變數名稱 | 型別 | 必填 | 描述 |
|:------:|:------:|:-----:|-----|
| name | string | ✓ | 檔案名稱 |
| size | number | ✓ | 檔案大小（單位：bytes） |
| type | string | ✓ | 檔案的 MIME 類型 |

### MultiFileUpload
![image](https://github.com/user-attachments/assets/75462060-a40c-4489-afd6-86d7dac616eb)  
- 複選的檔案上傳器
- 選擇檔案之後會顯示已選檔案

| 變數名稱 | 型別 | 必填 | 描述 |
|:------:|:------:|:-----:|-----|
| label | string | ✓ | 檔案上傳器的標籤文字 |
| id | string | ✓ | 檔案上傳器的唯一識別碼 |
| name | string | ✓ | 輸入框的 name 屬性 |
| onFileChange | function | ✓ | 檔案選擇改變時呼叫的回調函式，參數為 File 陣列 |
| accept | string |  | 可接受的MIME檔案類型，如 'image/jpeg, image/png	,application/pdf' |
| acceptText | string |  | 顯示給使用者的可接受檔案類型文字說明，如 '.jpg,.png,.pdf' |
| maxSizeMB | number |  | 單一檔案大小限制（單位：MB） |
| preview | boolean |  | 是否顯示檔案預覽 |
| required | boolean |  | 是否為必填欄位 |
| errorMessage | string |  | 顯示的錯誤訊息 |
| filesInfo | uploadFileInfo[] |  | 當前已上傳檔案的資訊陣列 |

uploadFileInfo   
| 變數名稱 | 型別 | 必填 | 描述 |
|:------:|:------:|:-----:|-----|
| name | string | ✓ | 檔案名稱 |
| size | number | ✓ | 檔案大小（單位：bytes） |
| type | string | ✓ | 檔案的 MIME 類型 |

### Input
![image](https://github.com/user-attachments/assets/2f56e71a-b5e9-4ed4-9f88-760549cd3ad2)  
- 輸入框

| 變數名稱 | 型別 | 必填 | 描述 |
|:------:|:------:|:-----:|-----|
| label | string | ✓ | 輸入框的標籤文字 |
| id | string | ✓ | 輸入框的唯一識別碼 |
| name | string | ✓ | 輸入框的 name 屬性 |
| value | string | ✓ | 輸入框當前的值 |
| required | boolean |  | 是否為必填欄位 |
| onBlurValidation | function |  | 輸入框失去焦點時的驗證回調函式，參數包含驗證是否通過及可選的錯誤訊息 |
| errorMessage | string |  | 顯示的錯誤訊息 |
| onChange | function |  | 輸入框值改變時的回調函式 |

### Select
![image](https://github.com/user-attachments/assets/c8b75bcd-bf7a-49d9-a4bf-b34fab92ed98)
- 下拉選單

| 變數名稱 | 型別 | 必填 | 描述 |
|:------:|:------:|:-----:|-----|
| label | string | ✓ | 下拉選單的標籤文字 |
| id | string | ✓ | 下拉選單的唯一識別碼 |
| name | string | ✓ | 下拉選單的 name 屬性 |
| options | selectOption[] | ✓ | 選項陣列，定義下拉選單中的可選項目 |
| value | string |  | 下拉選單當前選中的值 |
| onChange | function |  | 選項改變時的回調函式 |
| required | boolean |  | 是否為必填欄位 |
| errorMessage | string |  | 顯示的錯誤訊息 |
| onChangeValidation | function |  | 選項改變時的驗證回調函式，參數包含驗證是否通過及可選的錯誤訊息 |

### StepIndicator
![image](https://github.com/user-attachments/assets/07ba9f11-51bd-43c6-8e41-e5c5a733eef1)
![image](https://github.com/user-attachments/assets/41225b96-dc80-4379-a234-688d54ae6a67)
- 步驟指示器
- 藍色為 active
- 綠色為 completed
- 灰色為 尚未達成之步驟
- 可透過按取步驟，跳之該步驟（但不進行驗證，設想情境為想先回某步驟檢查資料）

| 變數名稱 | 型別 | 必填 | 描述 |
|:------:|:------:|:-----:|-----|
| currentStep | number | ✓ | 當前所在的步驟編號（1、2、3...） |
| totalSteps | string[] | ✓ | 步驟名稱陣列，陣列長度即為步驟總數 |
| onStepClick | function |  | 點擊步驟時的回調函式，參數為步驟編號 |



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
