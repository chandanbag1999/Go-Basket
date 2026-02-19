# Go-Basket API — Postman Testing Guide

## Base URL
```
http://localhost:8080

## Auth Routes — `/api/v1/auth`

---

### 1. Send OTP

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `http://localhost:8080/api/v1/auth/send-otp` |
| **Content-Type** | `application/json` |

**Request Body:**
```json
{
  "mobile": "9876543210"
}
```

**Success Response (200):**
```json
{
  "message": "OTP sent successfully",
  "success": true
}
```
> OTP server console mein print hoga — terminal dekho!

**Error — Missing Mobile (400):**
```json
{
  "message": "Mobile number is required",
  "success": false
}
```

**Error — Invalid Number (400):**
```json
{
  "message": "Invalid mobile number",
  "success": false
}
```

---

### 2. Verify OTP

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `http://localhost:8080/api/v1/auth/verify-otp` |
| **Content-Type** | `application/json` |

**Request Body:**
```json
{
  "mobile": "9876543210",
  "otp": "482931"
}
```

**Success Response — NEW User (200):**
```json
{
  "message": "OTP verified. Complete your profile.",
  "success": true,
  "isNewUser": true,
  "token": null
}
```
> `isNewUser: true` → Frontend name form dikhayega

**Success Response — EXISTING User (200):**
```json
{
  "message": "Login successfully",
  "success": true,
  "isNewUser": false,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65f1a2b3c4d5e6f7a8b9c0d1",
    "firstName": "Chandan",
    "mobile": "9876543210",
    "role": "customer"
  }
}
```

**Error — Wrong OTP (400):**
```json
{
  "message": "Invalid OTP",
  "success": false
}
```

**Error — Expired OTP (400):**
```json
{
  "message": "OTP expired or not found",
  "success": false
}
```

---

### 3. Setup Profile (New Users Only)

| Field | Value |
|---|---|
| **Method** | `POST` |
| **URL** | `http://localhost:8080/api/v1/auth/set-up-profile` |
| **Content-Type** | `application/json` |

**Request Body:**
```json
{
  "mobile": "9876543210",
  "firstName": "Chandan"
}
```

**Success Response (201):**
```json
{
  "message": "Welcome to Go-Basket! 🛒",
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65f1a2b3c4d5e6f7a8b9c0d1",
    "firstName": "Chandan",
    "mobile": "9876543210",
    "role": "customer"
  }
}
```

**Error — Already Exists (400):**
```json
{
  "message": "User already exist. Please login.",
  "success": false
}
```

---

## Complete Testing Flow (Step by Step)

### 🔴 Test Flow 1: New User Registration

```
Step 1: POST /send-otp      → { mobile: "9876543210" }
                              ↓ Console pe OTP dekho
Step 2: POST /verify-otp    → { mobile: "9876543210", otp: "XXXXXX" }
                              ↓ Response: { isNewUser: true }
Step 3: POST /set-up-profile → { mobile: "9876543210", firstName: "Chandan" }
                              ↓ Response: { token: "eyJ..." } ✅ SAVE THIS TOKEN!
```

### 🟢 Test Flow 2: Existing User Login

```
Step 1: POST /send-otp      → { mobile: "9876543210" }  (same number)
                              ↓ Console pe OTP dekho
Step 2: POST /verify-otp    → { mobile: "9876543210", otp: "XXXXXX" }
                              ↓ Response: { isNewUser: false, token: "eyJ..." } ✅
```

### 🔵 Test Flow 3: Edge Cases

```
Test A: Galat OTP dena      → 400 "Invalid OTP"
Test B: 5 min baad OTP dena → 400 "OTP expired or not found"
Test C: Bina mobile POST    → 400 "Mobile number is required"
Test D: "12345" dena (5 digit) → 400 "Invalid mobile number"
```

---

## Health Check

| Field | Value |
|---|---|
| **Method** | `GET` |
| **URL** | `http://localhost:8080/` |

**Response (200):**
```json
{
  "meassage": "Wealcome to Go-Basket API! Engine is running.",
  "success": true
}
```

---

## Postman Environment Setup (Recommended)

Postman mein **Environment** banao taaki baar baar URL type na karna pade:

1. Postman → Environments → New
2. Environment Name: `Go-Basket Local`
3. Variables add karo:

| Variable | Value |
|---|---|
| `BASE_URL` | `http://localhost:8080` |
| `AUTH_TOKEN` | *(login ke baad token yahan paste karo)* |

4. Ab URLs mein likhna: `{{BASE_URL}}/api/v1/auth/send-otp`
5. Token wali requests mein Header: `Authorization: Bearer {{AUTH_TOKEN}}`

---

## Server Start Command

```bash
cd backend
node index.js
```

Expected output:
```
Server started on port: 8080
Go-Basket Database Connected!
```
