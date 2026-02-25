# Go-Basket API — Postman Testing Guide

## Base URL
```
http://localhost:8080
```

## Server Start
```bash
cd backend
node index.js
```
Expected:
```
Server started on port: 8080
Go-Basket Database Connected!
```

---

## Postman Environment Setup (Recommended)

1. Postman → Environments → **New**
2. Environment Name: `Go-Basket Local`
3. Add variables:

| Variable       | Initial Value                  |
|----------------|--------------------------------|
| `BASE_URL`     | `http://localhost:8080`         |
| `ACCESS_TOKEN` | *(paste after login)*          |
| `CATEGORY_ID`  | *(paste after creating category)* |

4. Use `{{BASE_URL}}` in URLs
5. Use `{{ACCESS_TOKEN}}` in Authorization headers

---

## Health Check

| Field    | Value |
|----------|-------|
| Method   | `GET` |
| URL      | `{{BASE_URL}}/` |

**Response (200):**
```json
{
    "message": "Welcome to Go-Basket API! Engine is running.",
    "success": true
}
```

---

---

# 🔐 AUTH ROUTES — `/api/v1/auth`

---

### 1. Send OTP

| Field        | Value |
|--------------|-------|
| **Method**   | `POST` |
| **URL**      | `{{BASE_URL}}/api/v1/auth/send-otp` |
| **Auth**     | None |

**Body (JSON):**
```json
{
    "mobile": "9876543210"
}
```

**✅ Success (200):**
```json
{
    "message": "OTP sent successfully",
    "success": true,
    "otp": "482931"
}
```
> OTP backend console pe bhi print hoga. `otp` field sirf dev mode mein aata hai.

**❌ Missing mobile (400):**
```json
{ "message": "Mobile number is required", "success": false }
```

**❌ Invalid number (400):**
```json
{ "message": "Invalid mobile number", "success": false }
```

---

### 2. Verify OTP — New User

| Field        | Value |
|--------------|-------|
| **Method**   | `POST` |
| **URL**      | `{{BASE_URL}}/api/v1/auth/verify-otp` |
| **Auth**     | None |

**Body (JSON):**
```json
{
    "mobile": "9876543210",
    "otp": "482931"
}
```

**✅ New User (200):**
```json
{
    "message": "OTP verified. Complete your profile.",
    "success": true,
    "isNewUser": true,
    "accessToken": null,
    "refreshToken": null
}
```

**✅ Existing User (200):**
```json
{
    "message": "Login successfully",
    "success": true,
    "isNewUser": false,
    "accessToken": "eyJhbGciOiJI...",
    "refreshToken": "eyJhbGciOiJI...",
    "user": {
        "id": "65f1a2b3c4d5e6f7a8b9c0d1",
        "firstName": "Chandan",
        "mobile": "9876543210",
        "role": "customer"
    }
}
```
> 📋 **COPY** the `accessToken` → save in Postman variable `ACCESS_TOKEN`

**❌ Wrong OTP (400):**
```json
{ "message": "Invalid OTP", "success": false }
```

**❌ Expired OTP (400):**
```json
{ "message": "OTP expired or not found", "success": false }
```

---

### 3. Setup Profile (New Users Only)

| Field        | Value |
|--------------|-------|
| **Method**   | `POST` |
| **URL**      | `{{BASE_URL}}/api/v1/auth/setup-profile` |
| **Auth**     | None |

**Body (JSON):**
```json
{
    "mobile": "9876543210",
    "firstName": "Chandan"
}
```

**✅ Success (201):**
```json
{
    "message": "Welcome to Go-Basket! 🛒",
    "success": true,
    "accessToken": "eyJhbGciOiJI...",
    "refreshToken": "eyJhbGciOiJI...",
    "user": {
        "id": "65f1a2b3c4d5e6f7a8b9c0d1",
        "firstName": "Chandan",
        "mobile": "9876543210",
        "role": "customer"
    }
}
```
> 📋 **COPY** the `accessToken` → save in Postman variable `ACCESS_TOKEN`

**❌ Already exists (400):**
```json
{ "message": "User already exist. Please login.", "success": false }
```

---

### 4. Refresh Token

| Field        | Value |
|--------------|-------|
| **Method**   | `POST` |
| **URL**      | `{{BASE_URL}}/api/v1/auth/refresh-token` |
| **Auth**     | None (uses cookie or body) |

**Body (JSON):**
```json
{
    "refreshToken": "eyJhbGciOiJI..."
}
```

**✅ Success (200):**
```json
{
    "message": "Token refreshed",
    "success": true,
    "token": "eyJhbGciOiJI..."
}
```

---

### 5. Logout

| Field        | Value |
|--------------|-------|
| **Method**   | `POST` |
| **URL**      | `{{BASE_URL}}/api/v1/auth/logout` |
| **Auth**     | `Bearer {{ACCESS_TOKEN}}` |

**Headers:**
| Key             | Value                       |
|-----------------|-----------------------------|
| `Authorization` | `Bearer {{ACCESS_TOKEN}}`   |

**✅ Success (200):**
```json
{
    "message": "Logged out successfully",
    "success": true
}
```

---

### 6. Get Current User (Me)

| Field        | Value |
|--------------|-------|
| **Method**   | `GET` |
| **URL**      | `{{BASE_URL}}/api/v1/auth/me` |
| **Auth**     | `Bearer {{ACCESS_TOKEN}}` |

**Headers:**
| Key             | Value                       |
|-----------------|-----------------------------|
| `Authorization` | `Bearer {{ACCESS_TOKEN}}`   |

**✅ Success (200):**
```json
{
    "success": true,
    "user": {
        "id": "65f1a2...",
        "firstName": "Chandan",
        "lastName": null,
        "mobile": "9876543210",
        "email": null,
        "avatar": null,
        "role": "customer",
        "isProfileComplete": true,
        "isVerified": false
    }
}
```

---

---

# 📂 CATEGORY ROUTES — `/api/v1/category`

> ⚠️ **Create/Update/Delete = Admin only!** User ka `role` MongoDB mein manually `"admin"` karna padega pehle.

---

### 1. Create Category (Admin)

| Field        | Value |
|--------------|-------|
| **Method**   | `POST` |
| **URL**      | `{{BASE_URL}}/api/v1/category` |
| **Auth**     | `Bearer {{ACCESS_TOKEN}}` (admin) |

**Headers:**
| Key             | Value                       |
|-----------------|-----------------------------|
| `Authorization` | `Bearer {{ACCESS_TOKEN}}`   |

**Body (JSON):**
```json
{
    "name": "Fruits & Vegetables",
    "image": "https://example.com/fruits.jpg"
}
```

**✅ Success (201):**
```json
{
    "message": "Category created successfully",
    "success": true,
    "category": {
        "_id": "65f1a2b3...",
        "name": "Fruits & Vegetables",
        "slug": "fruits-vegetables",
        "image": "https://example.com/fruits.jpg",
        "isActive": true,
        "createdAt": "2026-02-24T...",
        "updatedAt": "2026-02-24T..."
    }
}
```
> 📋 **COPY** the `_id` → save in Postman variable `CATEGORY_ID`

**❌ Duplicate (400):**
```json
{ "message": "Category already exists", "success": false }
```

**❌ Not admin (403):**
```json
{ "message": "Access denied. Insufficient permissions.", "success": false }
```

---

### 2. Get All Categories (Public)

| Field        | Value |
|--------------|-------|
| **Method**   | `GET` |
| **URL**      | `{{BASE_URL}}/api/v1/category` |
| **Auth**     | None |

**✅ Success (200):**
```json
{
    "message": "Categories fetched successfully",
    "success": true,
    "categories": [
        {
            "_id": "65f1a2b3...",
            "name": "Dairy",
            "slug": "dairy",
            "image": null,
            "isActive": true
        },
        {
            "_id": "65f1a2c4...",
            "name": "Fruits & Vegetables",
            "slug": "fruits-vegetables",
            "image": "https://example.com/fruits.jpg",
            "isActive": true
        }
    ],
    "count": 2
}
```

---

### 3. Get Single Category by Slug (Public)

| Field        | Value |
|--------------|-------|
| **Method**   | `GET` |
| **URL**      | `{{BASE_URL}}/api/v1/category/fruits-vegetables` |
| **Auth**     | None |

**✅ Success (200):**
```json
{
    "message": "Category fetched successfully",
    "success": true,
    "category": {
        "_id": "65f1a2b3...",
        "name": "Fruits & Vegetables",
        "slug": "fruits-vegetables",
        "image": "https://example.com/fruits.jpg",
        "isActive": true
    }
}
```

**❌ Not found (404):**
```json
{ "message": "Category not found", "success": false }
```

---

### 4. Update Category (Admin)

| Field        | Value |
|--------------|-------|
| **Method**   | `PUT` |
| **URL**      | `{{BASE_URL}}/api/v1/category/{{CATEGORY_ID}}` |
| **Auth**     | `Bearer {{ACCESS_TOKEN}}` (admin) |

**Body (JSON):**
```json
{
    "name": "Fresh Fruits",
    "isActive": false
}
```

**✅ Success (200):**
```json
{
    "message": "Category updated successfully",
    "success": true,
    "category": {
        "_id": "65f1a2b3...",
        "name": "Fresh Fruits",
        "slug": "fresh-fruits",
        "isActive": false
    }
}
```

---

### 5. Delete Category (Admin)

| Field        | Value |
|--------------|-------|
| **Method**   | `DELETE` |
| **URL**      | `{{BASE_URL}}/api/v1/category/{{CATEGORY_ID}}` |
| **Auth**     | `Bearer {{ACCESS_TOKEN}}` (admin) |

**✅ Success (200):**
```json
{
    "message": "Category deleted successfully",
    "success": true
}
```

---

---

# 📦 PRODUCT ROUTES — `/api/v1/product`

> ⚠️ **Create/Update/Delete = Admin only!**

---

### 1. Create Product (Admin)

| Field        | Value |
|--------------|-------|
| **Method**   | `POST` |
| **URL**      | `{{BASE_URL}}/api/v1/product` |
| **Auth**     | `Bearer {{ACCESS_TOKEN}}` (admin) |

**Headers:**
| Key             | Value                       |
|-----------------|-----------------------------|
| `Authorization` | `Bearer {{ACCESS_TOKEN}}`   |

**Body (JSON):**
```json
{
    "name": "Amul Taza Milk",
    "description": "Fresh toned milk for daily use",
    "price": 27,
    "discountPrice": 25,
    "stockQuantity": 100,
    "unit": "packet",
    "unitValue": "500ml",
    "image": ["https://example.com/milk1.jpg", "https://example.com/milk2.jpg"],
    "category": "{{CATEGORY_ID}}",
    "isFeatured": true
}
```

**✅ Success (201):**
```json
{
    "message": "Product created successfully",
    "success": true,
    "product": {
        "_id": "65f2b3c4...",
        "name": "Amul Taza Milk",
        "slug": "amul-taza-milk",
        "description": "Fresh toned milk for daily use",
        "price": 27,
        "discountPrice": 25,
        "stockQuantity": 100,
        "unit": "packet",
        "unitValue": "500ml",
        "image": ["https://example.com/milk1.jpg", "https://example.com/milk2.jpg"],
        "category": "65f1a2b3...",
        "isActive": true,
        "isFeatured": true
    }
}
```

**❌ Missing fields (400):**
```json
{ "message": "Name, price, category and unit are required", "success": false }
```

**❌ Invalid category (404):**
```json
{ "message": "Category not found. Please provide valid category ID.", "success": false }
```

**❌ Duplicate product (400):**
```json
{ "message": "Product already exists", "success": false }
```

---

### 2. Get All Products (Public) — with Filters & Pagination

| Field        | Value |
|--------------|-------|
| **Method**   | `GET` |
| **Auth**     | None |

**Available Query Parameters:**

| Param      | Example                     | Description              |
|------------|-----------------------------|--------------------------|
| `search`   | `?search=milk`              | Name mein search karo    |
| `category` | `?category=65f1a2b3...`     | Category ID se filter    |
| `featured` | `?featured=true`            | Sirf featured products   |
| `page`     | `?page=2`                   | Page number (default: 1) |
| `limit`    | `?limit=10`                 | Per page items (default: 20) |

**Example URLs:**
```
GET {{BASE_URL}}/api/v1/product
GET {{BASE_URL}}/api/v1/product?search=milk
GET {{BASE_URL}}/api/v1/product?category={{CATEGORY_ID}}&page=1&limit=5
GET {{BASE_URL}}/api/v1/product?featured=true
```

**✅ Success (200):**
```json
{
    "message": "Products fetched successfully",
    "success": true,
    "count": 2,
    "total": 15,
    "page": 1,
    "totalPages": 8,
    "products": [
        {
            "_id": "65f2b3c4...",
            "name": "Amul Taza Milk",
            "slug": "amul-taza-milk",
            "price": 27,
            "discountPrice": 25,
            "stockQuantity": 100,
            "unit": "packet",
            "category": {
                "_id": "65f1a2b3...",
                "name": "Dairy",
                "slug": "dairy"
            },
            "isActive": true,
            "isFeatured": true
        }
    ]
}
```

---

### 3. Get Single Product by Slug (Public)

| Field        | Value |
|--------------|-------|
| **Method**   | `GET` |
| **URL**      | `{{BASE_URL}}/api/v1/product/amul-taza-milk` |
| **Auth**     | None |

**✅ Success (200):**
```json
{
    "message": "Product fetched successfully",
    "success": true,
    "product": {
        "_id": "65f2b3c4...",
        "name": "Amul Taza Milk",
        "slug": "amul-taza-milk",
        "description": "Fresh toned milk for daily use",
        "price": 27,
        "discountPrice": 25,
        "category": {
            "_id": "65f1a2b3...",
            "name": "Dairy",
            "slug": "dairy"
        }
    }
}
```

---

### 4. Get Products by Category Slug (Public)

| Field        | Value |
|--------------|-------|
| **Method**   | `GET` |
| **URL**      | `{{BASE_URL}}/api/v1/product/category/dairy` |
| **Auth**     | None |

**✅ Success (200):**
```json
{
    "message": "Products fetched successfully",
    "success": true,
    "count": 3,
    "category": {
        "name": "Dairy",
        "slug": "dairy"
    },
    "products": [...]
}
```

---

### 5. Update Product (Admin)

| Field        | Value |
|--------------|-------|
| **Method**   | `PUT` |
| **URL**      | `{{BASE_URL}}/api/v1/product/<product_id>` |
| **Auth**     | `Bearer {{ACCESS_TOKEN}}` (admin) |

**Body (JSON) — sirf jo change karna hai woh bhejo:**
```json
{
    "price": 30,
    "discountPrice": 28,
    "stockQuantity": 200,
    "isFeatured": false
}
```

**✅ Success (200):**
```json
{
    "message": "Product updated successfully",
    "success": true,
    "product": { ... }
}
```

---

### 6. Delete Product (Admin)

| Field        | Value |
|--------------|-------|
| **Method**   | `DELETE` |
| **URL**      | `{{BASE_URL}}/api/v1/product/<product_id>` |
| **Auth**     | `Bearer {{ACCESS_TOKEN}}` (admin) |

**✅ Success (200):**
```json
{
    "message": "Product deleted successfully",
    "success": true
}
```

---

---

# 🧪 COMPLETE TESTING FLOWS

---

## Flow 1: New User Registration → Admin Setup → Create Products

```
Step 1: POST /auth/send-otp         → { mobile: "9876543210" }
Step 2: POST /auth/verify-otp       → { mobile, otp } → isNewUser: true
Step 3: POST /auth/setup-profile    → { mobile, firstName } → SAVE accessToken
Step 4: MongoDB Atlas → Change user role to "admin"
Step 5: POST /auth/send-otp (again) → Re-login to get admin token  
Step 6: POST /auth/verify-otp       → SAVE new accessToken (now admin)
Step 7: POST /category              → { name: "Dairy" } → SAVE _id
Step 8: POST /product               → { name, price, category: saved_id }
Step 9: GET  /product                → Verify product appears
```

## Flow 2: Public User Browse Products

```
Step 1: GET /category                → See all categories
Step 2: GET /product/category/dairy  → See dairy products
Step 3: GET /product/amul-taza-milk  → See product detail
Step 4: GET /product?search=milk     → Search products
```

## Flow 3: Edge Cases

```
Test A: POST /category without token     → 401 "No token provided"
Test B: POST /category with customer token → 403 "Insufficient permissions"
Test C: POST /product with invalid category_id → 404 "Category not found"
Test D: GET  /product?page=999          → 200 with empty products array
Test E: GET  /category/non-existent-slug → 404 "Category not found"
Test F: POST /product duplicate name    → 400 "Product already exists"
```

---

# 📊 API Summary Table

| # | Method | URL | Auth | Description |
|---|--------|-----|------|-------------|
| 1 | POST | `/api/v1/auth/send-otp` | ❌ | Send OTP to mobile |
| 2 | POST | `/api/v1/auth/verify-otp` | ❌ | Verify OTP |
| 3 | POST | `/api/v1/auth/setup-profile` | ❌ | New user name setup |
| 4 | POST | `/api/v1/auth/refresh-token` | ❌ | Refresh access token |
| 5 | POST | `/api/v1/auth/logout` | ✅ | Logout user |
| 6 | GET  | `/api/v1/auth/me` | ✅ | Get current user |
| 7 | GET  | `/api/v1/category` | ❌ | Get all categories |
| 8 | GET  | `/api/v1/category/:slug` | ❌ | Get single category |
| 9 | POST | `/api/v1/category` | 🔒 Admin | Create category |
| 10 | PUT  | `/api/v1/category/:id` | 🔒 Admin | Update category |
| 11 | DELETE | `/api/v1/category/:id` | 🔒 Admin | Delete category |
| 12 | GET  | `/api/v1/product` | ❌ | Get all products |
| 13 | GET  | `/api/v1/product/:slug` | ❌ | Get single product |
| 14 | GET  | `/api/v1/product/category/:slug` | ❌ | Products by category |
| 15 | POST | `/api/v1/product` | 🔒 Admin | Create product |
| 16 | PUT  | `/api/v1/product/:id` | 🔒 Admin | Update product |
| 17 | DELETE | `/api/v1/product/:id` | 🔒 Admin | Delete product |

> ❌ = No auth needed | ✅ = Any logged-in user | 🔒 = Admin only
