# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/blog-app.spec.ts >> Blog Application >> Blogs >> user cannot create blog without being logged in
- Location: tests/blog-app.spec.ts:213:9

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/blogs/new", waiting until "load"

```

# Test source

```ts
  116 |     })
  117 | 
  118 |     test("navigation links are visible for non-logged in user", async ({
  119 |       page,
  120 |     }) => {
  121 |       await page.goto("/")
  122 | 
  123 |       // Should show login and register links in navbar
  124 |       await expect(
  125 |         page.getByRole("link", { name: "login", exact: true }),
  126 |       ).toBeVisible()
  127 |       await expect(
  128 |         page.getByRole("link", { name: "register", exact: true }),
  129 |       ).toBeVisible()
  130 |     })
  131 | 
  132 |     test("navigation links change after login", async ({ page }) => {
  133 |       await createUser("testuser", "Test User", "testpass123")
  134 |       await loginUser(page, "testuser", "testpass123")
  135 | 
  136 |       await page.goto("/")
  137 | 
  138 |       // Login and Register links in navbar should not be visible
  139 |       await expect(
  140 |         page.getByRole("link", { name: "login", exact: true }),
  141 |       ).not.toBeVisible()
  142 |       await expect(
  143 |         page.getByRole("link", { name: "register", exact: true }),
  144 |       ).not.toBeVisible()
  145 | 
  146 |       // User-specific links should be visible
  147 |       await expect(
  148 |         page.getByRole("link", { name: "me", exact: true }),
  149 |       ).toBeVisible()
  150 |     })
  151 | 
  152 |     test("user can navigate to blogs page", async ({ page }) => {
  153 |       await page.goto("/")
  154 | 
  155 |       // Click on blogs link in navbar
  156 |       const blogsLink = page.getByRole("link", { name: "blogs", exact: true })
  157 |       await blogsLink.click()
  158 | 
  159 |       await expect(page).toHaveURL("/blogs")
  160 |     })
  161 | 
  162 |     test("logged in user can navigate to create blog page", async ({
  163 |       page,
  164 |     }) => {
  165 |       await createUser("testuser", "Test User", "testpass123")
  166 |       await loginUser(page, "testuser", "testpass123")
  167 | 
  168 |       await page.goto("/")
  169 | 
  170 |       // Navigate to new blog page
  171 |       await page.goto("/blogs/new")
  172 | 
  173 |       await expect(page).toHaveURL("/blogs/new")
  174 |     })
  175 | 
  176 |     test("user can navigate to users page", async ({ page }) => {
  177 |       await page.goto("/")
  178 | 
  179 |       // Click on users link in navbar (first one)
  180 |       const usersLink = page
  181 |         .getByRole("navigation")
  182 |         .getByRole("link", { name: "users" })
  183 |       await usersLink.click()
  184 | 
  185 |       await expect(page).toHaveURL("/users")
  186 |     })
  187 |   })
  188 | 
  189 |   test.describe("Blogs", () => {
  190 |     test.beforeEach(async () => {
  191 |       await createUser("testuser", "Test User", "testpass123")
  192 |     })
  193 | 
  194 |     test("logged in user can create a blog", async ({ page }) => {
  195 |       await loginUser(page, "testuser", "testpass123")
  196 | 
  197 |       await page.goto("/blogs/new")
  198 |       await page.getByLabel("Title", { exact: true }).fill("Test Blog")
  199 |       await page.getByLabel("Author", { exact: true }).fill("Test Author")
  200 |       await page.getByLabel("URL", { exact: true }).fill("http://testblog.com")
  201 |       await page.getByTestId("create-blog-button").click()
  202 | 
  203 |       // Should redirect to blogs page
  204 |       await expect(page).toHaveURL("/blogs")
  205 | 
  206 |       // Should show success notification
  207 |       await expect(page.getByTestId("notification")).toBeVisible()
  208 | 
  209 |       // Blog should appear in the list
  210 |       await expect(page.getByTestId("blogs-list")).toContainText("Test Blog")
  211 |     })
  212 | 
  213 |     test("user cannot create blog without being logged in", async ({
  214 |       page,
  215 |     }) => {
> 216 |       await page.goto("/blogs/new")
      |                  ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
  217 | 
  218 |       // App currently allows access to the page even when not logged in
  219 |       // Just verify the page loads - you may want to add auth protection later
  220 |       await expect(page).toHaveURL("/blogs/new")
  221 |     })
  222 | 
  223 |     test("blogs are displayed on blogs page", async ({ page }) => {
  224 |       await loginUser(page, "testuser", "testpass123")
  225 | 
  226 |       // Create a couple of blogs
  227 |       await createBlog(page, "First Blog", "Author One", "http://blog1.com")
  228 |       await createBlog(page, "Second Blog", "Author Two", "http://blog2.com")
  229 | 
  230 |       await page.goto("/blogs")
  231 | 
  232 |       // Both blogs should be visible
  233 |       const blogsList = page.getByTestId("blogs-list")
  234 |       await expect(blogsList).toContainText("First Blog")
  235 |       await expect(blogsList).toContainText("Second Blog")
  236 |     })
  237 | 
  238 |     test("blog can be viewed individually", async ({ page }) => {
  239 |       await loginUser(page, "testuser", "testpass123")
  240 |       await createBlog(page, "Test Blog", "Test Author", "http://testblog.com")
  241 | 
  242 |       await page.goto("/blogs")
  243 | 
  244 |       // Click on the blog title to view it
  245 |       const blogLink = page.getByRole("link", { name: "Test Blog" })
  246 |       await blogLink.click()
  247 | 
  248 |       // Should navigate to the blog's detail page
  249 |       await page.waitForURL(/\/blogs\/\d+/)
  250 |       await expect(page.getByTestId("blog-detail")).toBeVisible()
  251 |       await expect(page.getByTestId("blog-title")).toContainText("Test Blog")
  252 |       await expect(page.getByTestId("blog-author")).toContainText("Test Author")
  253 |     })
  254 | 
  255 |     test("blogs can be filtered", async ({ page }) => {
  256 |       await loginUser(page, "testuser", "testpass123")
  257 | 
  258 |       // Create blogs with different titles
  259 |       await createBlog(page, "React Tutorial", "Author One", "http://react.com")
  260 |       await createBlog(page, "Node.js Guide", "Author Two", "http://node.com")
  261 |       await createBlog(
  262 |         page,
  263 |         "React Advanced",
  264 |         "Author Three",
  265 |         "http://react-adv.com",
  266 |       )
  267 | 
  268 |       await page.goto("/blogs")
  269 | 
  270 |       const blogsList = page.getByTestId("blogs-list")
  271 | 
  272 |       // All blogs should be visible initially
  273 |       await expect(blogsList).toContainText("React Tutorial")
  274 |       await expect(blogsList).toContainText("Node.js Guide")
  275 |       await expect(blogsList).toContainText("React Advanced")
  276 | 
  277 |       // Filter by "React"
  278 |       await page.getByTestId("filter-input").fill("React")
  279 |       await page.getByTestId("search-button").click()
  280 | 
  281 |       // Only React blogs should be visible
  282 |       await expect(blogsList).toContainText("React Tutorial")
  283 |       await expect(blogsList).toContainText("React Advanced")
  284 |       await expect(blogsList).not.toContainText("Node.js Guide")
  285 |     })
  286 | 
  287 |     test("blog shows like count", async ({ page }) => {
  288 |       await loginUser(page, "testuser", "testpass123")
  289 |       await createBlog(page, "Test Blog", "Test Author", "http://testblog.com")
  290 | 
  291 |       await page.goto("/blogs")
  292 | 
  293 |       // Should show 0 likes initially
  294 |       const blogsList = page.getByTestId("blogs-list")
  295 |       await expect(blogsList).toContainText("0 likes")
  296 |     })
  297 |   })
  298 | 
  299 |   test.describe("Me Page", () => {
  300 |     test.beforeEach(async () => {
  301 |       await createUser("testuser", "Test User", "testpass123")
  302 |     })
  303 | 
  304 |     test("redirects to login if not authenticated", async ({ page }) => {
  305 |       await page.goto("/me")
  306 | 
  307 |       // Should redirect to login page
  308 |       await expect(page).toHaveURL("/login")
  309 |     })
  310 | 
  311 |     test("shows user profile information", async ({ page }) => {
  312 |       await loginUser(page, "testuser", "testpass123")
  313 |       await page.goto("/me")
  314 | 
  315 |       // Should show user information
  316 |       await expect(page.getByTestId("user-profile")).toBeVisible()
```