# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/blog-app.spec.ts >> Blog Application >> Me Page >> redirects to login if not authenticated
- Location: tests/blog-app.spec.ts:304:9

# Error details

```
Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
Call log:
  - navigating to "/me", waiting until "load"

```

# Test source

```ts
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
  216 |       await page.goto("/blogs/new")
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
> 305 |       await page.goto("/me")
      |                  ^ Error: page.goto: Protocol error (Page.navigate): Cannot navigate to invalid URL
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
  317 |       await expect(page.getByTestId("user-name")).toContainText("Test User")
  318 |       await expect(page.getByTestId("user-username")).toContainText("testuser")
  319 |     })
  320 | 
  321 |     test("shows empty reading list message", async ({ page }) => {
  322 |       await loginUser(page, "testuser", "testpass123")
  323 |       await page.goto("/me")
  324 | 
  325 |       await expect(page.getByTestId("reading-list-section")).toBeVisible()
  326 |       await expect(page.getByTestId("empty-reading-list")).toBeVisible()
  327 |     })
  328 | 
  329 |     test("shows reading list with unread blog", async ({ page }) => {
  330 |       // Create another user to own a blog
  331 |       await createUser("blogowner", "Blog Owner", "password123")
  332 |       await loginUser(page, "blogowner", "password123")
  333 |       await createBlog(page, "Test Blog", "Test Author", "http://test.com")
  334 | 
  335 |       // Login as testuser and add blog to reading list
  336 |       await loginUser(page, "testuser", "testpass123")
  337 |       await page.goto("/blogs")
  338 |       await page.getByRole("link", { name: "Test Blog" }).click()
  339 | 
  340 |       // Wait for page to load and add to reading list
  341 |       await page.waitForSelector('[data-testid="add-to-reading-list-button"]')
  342 | 
  343 |       // Click and wait for the request to complete
  344 |       await Promise.all([
  345 |         page.waitForResponse((response) => response.status() === 200),
  346 |         page.getByTestId("add-to-reading-list-button").click(),
  347 |       ])
  348 | 
  349 |       // Navigate to me page
  350 |       await page.goto("/me")
  351 | 
  352 |       // Should show in unread section
  353 |       await expect(page.getByTestId("unread-section")).toBeVisible()
  354 |       await expect(page.getByTestId("unread-section")).toContainText(
  355 |         "Test Blog",
  356 |       )
  357 |     })
  358 | 
  359 |     test("can mark blog as read", async ({ page }) => {
  360 |       // Create another user to own a blog
  361 |       await createUser("blogowner", "Blog Owner", "password123")
  362 |       await loginUser(page, "blogowner", "password123")
  363 |       await createBlog(page, "Test Blog", "Test Author", "http://test.com")
  364 | 
  365 |       // Login as testuser and add blog to reading list
  366 |       await loginUser(page, "testuser", "testpass123")
  367 |       await page.goto("/blogs")
  368 |       await page.getByRole("link", { name: "Test Blog" }).click()
  369 |       await page.waitForSelector('[data-testid="add-to-reading-list-button"]')
  370 |       await page.getByTestId("add-to-reading-list-button").click()
  371 | 
  372 |       // Wait for server action to complete
  373 |       await page.waitForTimeout(500)
  374 | 
  375 |       // Go to me page and mark as read
  376 |       await page.goto("/me")
  377 |       await page.waitForSelector('[data-testid^="mark-read-"]', {
  378 |         timeout: 10000,
  379 |       })
  380 | 
  381 |       // Click the first mark as read button
  382 |       const markReadButton = page.locator('[data-testid^="mark-read-"]').first()
  383 |       await markReadButton.click()
  384 | 
  385 |       // Wait for the page to update
  386 |       await page.waitForTimeout(1000)
  387 | 
  388 |       // Should now show empty unread section
  389 |       await expect(page.getByTestId("no-unread-blogs")).toBeVisible()
  390 |     })
  391 | 
  392 |     test("shows multiple blogs in reading list", async ({ page }) => {
  393 |       // Create another user to own blogs
  394 |       await createUser("blogowner", "Blog Owner", "password123")
  395 |       await loginUser(page, "blogowner", "password123")
  396 |       await createBlog(page, "First Blog", "Author One", "http://first.com")
  397 |       await createBlog(page, "Second Blog", "Author Two", "http://second.com")
  398 | 
  399 |       // Login as testuser and add both blogs to reading list
  400 |       await loginUser(page, "testuser", "testpass123")
  401 | 
  402 |       await page.goto("/blogs")
  403 |       await page.getByRole("link", { name: "First Blog" }).click()
  404 |       await page.waitForSelector('[data-testid="add-to-reading-list-button"]')
  405 |       await Promise.all([
```