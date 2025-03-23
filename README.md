<div align="left" style="position: relative;">
<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" align="right" width="30%" style="margin: -20px 0 0 20px;">
<h1>RMS</h1>
<p align="left">
	<em>Empower Your Deployment Journey with RMS: Where Code Meets Efficiency!</em>
</p>
<p align="left">
	<img src="https://img.shields.io/github/license/Unemployed-CS-Majors/RMS?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/Unemployed-CS-Majors/RMS?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/Unemployed-CS-Majors/RMS?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/Unemployed-CS-Majors/RMS?style=default&color=0080ff" alt="repo-language-count">
</p>
<p align="left"><!-- default option, no dependency badges. -->
</p>
<p align="left">
	<!-- default option, no dependency badges. -->
</p>
</div>
<br clear="right">

##  Table of Contents

- [ Overview](#-overview)
- [ Features](#-features)
- [ Project Structure](#-project-structure)
    - [ Project Index](#-project-index)
- [ Getting Started](#-getting-started)
    - [ Prerequisites](#-prerequisites)
    - [ Installation](#-installation)
    - [ Usage](#-usage)
- [ Project Roadmap](#-project-roadmap)
- [ Contributing](#-contributing)
- [ License](#-license)
- [ Acknowledgments](#-acknowledgments)

---

##  Overview

The RMS project is a comprehensive solution for automating deployment to Firebase Hosting. It streamlines the process by configuring hosting settings, managing dependencies with package-lock.json, and automating deployment workflows with GitHub Actions. Targeted at developers and teams, RMS ensures efficient deployment and consistent stability for web applications.

---

##  Features

|     |      Feature      | Summary                                                                                                                                                                                                       |
|:----|:-----------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ⚙️  | **Architecture**  | <ul><li>Modular architecture with clear separation of concerns</li><li>Follows best practices for maintainability</li></ul>                                                                                   |
| 🔩  | **Code Quality**  | <ul><li>Consistent coding style and conventions</li><li>Regular code reviews and automated linting</li></ul>                                                                                                  |
| 📄  | **Documentation** | <ul><li>Extensive documentation covering codebase, APIs, and deployment processes</li><li>Includes code comments for better understanding</li><li>Interactive API documentation for easy reference</li></ul>  |
| 🔌  | **Integrations**  | <ul><li>Seamless integration with GitHub Actions for CI/CD</li><li>Integrates with Firebase for hosting and backend services</li><li>Supports third-party integrations for analytics and monitoring</li></ul> |
| 🧩  |  **Modularity**   | <ul><li>Decoupled components for reusability</li><li>Supports plugin architecture for extensibility</li></ul>                                                                                                 |
| ⚡️  |  **Performance**  | <ul><li>Optimized code for fast load times and responsiveness</li><li>Caches data for improved performance</li><li>Utilizes lazy loading and code splitting for efficient resource usage</li></ul>            |
| 🛡️ |   **Security**    | <ul><li>Follows security best practices to prevent common vulnerabilities</li>/ul>                                                                                                                            |
| 📦  | **Dependencies**  | <ul><li>Manages dependencies using npm with version locking</li><li>Includes essential libraries like axios, firebase</li><li>Regularly updates dependencies to ensure compatibility and security</li></ul>   |

---

##  Project Structure

```sh
└── RMS/
    ├── .github
    ├── LICENSE
    ├── README.md
    ├── firebase.json
    ├── package-lock.json
    ├── package.json
    ├── public
    └── src
```


###  Project Index
<details open>
	<summary><b><code>RMS/</code></b></summary>
	<details> <!-- __root__ Submodule -->
		<summary><b>__root__</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/firebase.json'>firebase.json</a></b></td>
				<td>- Configures Firebase hosting to serve the built web application from the 'build' directory<br>- Ignores specific files and directories, and sets up rewrites to direct all requests to 'index.html'<br>- This file defines the hosting settings for the project, ensuring proper deployment and serving of the web application.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/package-lock.json'>package-lock.json</a></b></td>
				<td>- The `package-lock.json` file in the project serves as a manifest for managing dependencies and their versions<br>- It ensures that the project uses specific versions of external libraries like axios, firebase, framer-motion, and others<br>- This file plays a crucial role in maintaining consistency and stability within the codebase by locking the versions of dependencies to prevent unexpected changes.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/package.json'>package.json</a></b></td>
				<td>- Define the project's dependencies and configuration settings in the package.json file<br>- This file manages scripts for starting, building, and testing the application, along with defining ESLint rules and browser compatibility<br>- It also lists devDependencies like react-scripts and dependencies such as axios, firebase, and styled-components.</td>
			</tr>
			</table>
		</blockquote>
	</details>
	<details> <!-- .github Submodule -->
		<summary><b>.github</b></summary>
		<blockquote>
			<details>
				<summary><b>workflows</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/.github/workflows/firebase-hosting-pull-prod.yml'>firebase-hosting-pull-prod.yml</a></b></td>
						<td>- Automate deployment to Firebase Hosting for the 'develop' branch using GitHub Actions<br>- The workflow triggers on push events, building and previewing the project on Ubuntu<br>- It deploys to Firebase Hosting with the specified repository token, service account, project ID, and channel ID.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/.github/workflows/firebase-hosting-pull-request.yml'>firebase-hosting-pull-request.yml</a></b></td>
						<td>- Automate deployment to Firebase Hosting for pull requests on the 'release' branch<br>- The workflow builds and previews changes using npm, then deploys to Firebase Hosting using the FirebaseExtended GitHub Action<br>- Permissions are set for checks, contents, and pull requests.</td>
					</tr>
					</table>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<details> <!-- src Submodule -->
		<summary><b>src</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/index.css'>index.css</a></b></td>
				<td>- Define global styling variables and import font for consistent design across the project<br>- Set primary colors, text colors, shadows, and radius values<br>- Ensure consistent box model and font usage throughout the application.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/App.js'>App.js</a></b></td>
				<td>Initializes the application, sets up routes, and clears local storage cart item upon mounting.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/index.js'>index.js</a></b></td>
				<td>Initialize the React application by rendering the App component within the AuthProvider context and attaching it to the DOM element with the ID 'root'.</td>
			</tr>
			</table>
			<details>
				<summary><b>modules</b></summary>
				<blockquote>
					<details>
						<summary><b>shared</b></summary>
						<blockquote>
							<details>
								<summary><b>contexts</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/shared/contexts/AuthContext.js'>AuthContext.js</a></b></td>
										<td>- Enables authentication functionalities by providing context and methods for user login, registration, logout, social login with Google and Facebook, password reset, account deletion, and retrieving restaurant configuration<br>- The AuthProvider component manages user authentication state and interactions with the server, enhancing the overall user experience within the codebase architecture.</td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>components</b></summary>
								<blockquote>
									<details>
										<summary><b>Navigation</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/shared/components/Navigation/Navigation.module.css'>Navigation.module.css</a></b></td>
												<td>- Define the styling for the navigation header, including responsiveness for mobile devices<br>- Handles the appearance and behavior of the header container, hamburger menu, and mobile menu<br>- Controls the layout and transitions for a seamless user experience across different screen sizes.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/shared/components/Navigation/Navigation.js'>Navigation.js</a></b></td>
												<td>- Manages the navigation bar appearance and functionality, including logo display, tab navigation, and authentication buttons<br>- Handles mobile and desktop views, adjusts navigation based on URL hash, and ensures a seamless user experience.</td>
											</tr>
											</table>
											<details>
												<summary><b>NavigationTabs</b></summary>
												<blockquote>
													<table>
													<tr>
														<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/shared/components/Navigation/NavigationTabs/NavigationTabs.js'>NavigationTabs.js</a></b></td>
														<td>- Implements a dynamic navigation component that renders tabs based on feature availability<br>- Handles tab visibility and animation effects, enhancing user experience.</td>
													</tr>
													<tr>
														<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/shared/components/Navigation/NavigationTabs/NavigationTabs.module.css'>NavigationTabs.module.css</a></b></td>
														<td>- Define the styling for the navigation tabs, including centering, layout, and button appearance<br>- Ensure consistent spacing and alignment for both desktop and mobile views<br>- Implement hover effects for interactive elements and a visual indicator for active tabs.</td>
													</tr>
													</table>
												</blockquote>
											</details>
											<details>
												<summary><b>Logo</b></summary>
												<blockquote>
													<table>
													<tr>
														<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/shared/components/Navigation/Logo/Logo.module.css'>Logo.module.css</a></b></td>
														<td>- Defines styling for the navigation logo component, setting margins, cursor behavior, font family, size, and color<br>- Enhances the visual appeal and user interaction of the logo within the project's navigation section.</td>
													</tr>
													<tr>
														<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/shared/components/Navigation/Logo/Logo.js'>Logo.js</a></b></td>
														<td>Defines a Logo component that renders a logo with animation effects.</td>
													</tr>
													</table>
												</blockquote>
											</details>
											<details>
												<summary><b>AuthButtons</b></summary>
												<blockquote>
													<table>
													<tr>
														<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/shared/components/Navigation/AuthButtons/AuthButtons.module.css'>AuthButtons.module.css</a></b></td>
														<td>Define styling for authentication buttons in the navigation component, ensuring consistent design and user experience across the application.</td>
													</tr>
													<tr>
														<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/shared/components/Navigation/AuthButtons/AuthButtons.js'>AuthButtons.js</a></b></td>
														<td>- The AuthButtons component renders login and sign-up authentication buttons, with animations, based on the device view<br>- It takes props for handling button clicks and mobile view detection<br>- This component enhances user interaction within the navigation section of the application.</td>
													</tr>
													</table>
												</blockquote>
											</details>
											<details>
												<summary><b>ProfileButton</b></summary>
												<blockquote>
													<table>
													<tr>
														<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/shared/components/Navigation/ProfileButton/ProfileButton.js'>ProfileButton.js</a></b></td>
														<td>- The ProfileButton component renders profile and dashboard buttons with animation effects based on user type and device view<br>- It handles click events for profile and dashboard actions, adjusting button styles for mobile and desktop views.</td>
													</tr>
													<tr>
														<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/shared/components/Navigation/ProfileButton/ProfileButton.module.css'>ProfileButton.module.css</a></b></td>
														<td>- Define consistent styling for profile and dashboard buttons in the navigation component, ensuring a cohesive visual experience across the application<br>- The CSS rules in the provided file maintain alignment, spacing, and color schemes for both desktop and mobile views, enhancing user interaction and navigation.</td>
													</tr>
													</table>
												</blockquote>
											</details>
											<details>
												<summary><b>HashNavigationWrapper</b></summary>
												<blockquote>
													<table>
													<tr>
														<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/shared/components/Navigation/HashNavigationWrapper/HashNavigationWrapper.js'>HashNavigationWrapper.js</a></b></td>
														<td>- Manages navigation based on URL hash and renders corresponding components<br>- Determines active view based on hash value, defaulting to 'Home' if none exists<br>- Renders Menu, Location, or Reservation components based on active view, with Home as default.</td>
													</tr>
													</table>
												</blockquote>
											</details>
										</blockquote>
									</details>
									<details>
										<summary><b>SocialIcons</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/shared/components/SocialIcons/SocialIcons.js'>SocialIcons.js</a></b></td>
												<td>Generates a SocialIcons component displaying consistent social media icons with styling, enhancing the project's UI.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/shared/components/SocialIcons/SocialIcons.module.css'>SocialIcons.module.css</a></b></td>
												<td>Define styling for social media icons with hover effects and responsive design in the project's CSS module.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>Layout</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/shared/components/Layout/Layout.jsx'>Layout.jsx</a></b></td>
												<td>- The Layout component renders the application's structure, incorporating navigation and main content<br>- It accepts children as props to display content within the layout.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/shared/components/Layout/Layout.module.css'>Layout.module.css</a></b></td>
												<td>- Defines the layout styling for the project, ensuring a responsive and visually appealing design<br>- It establishes the main structure and positioning of elements within the application, creating a cohesive user interface<br>- The file imports global styles and sets the layout container to flexibly adjust to different screen sizes, maintaining a consistent look and feel throughout the project.</td>
											</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<details>
								<summary><b>hooks</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/shared/hooks/useCurrentYear.js'>useCurrentYear.js</a></b></td>
										<td>- Provides a custom hook to dynamically fetch and update the current year for copyright notices in the application<br>- It ensures the year is always accurate, even if the app runs through a new year.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/shared/hooks/useImageSlider.js'>useImageSlider.js</a></b></td>
										<td>- Manages image slider functionality by handling transitions between images, auto-advancing at a specified interval, and enabling navigation to next, previous, or specific slides<br>- The hook maintains slider state and control functions for seamless user interaction within the project's shared modules.</td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>utils</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/shared/utils/cookieManager.js'>cookieManager.js</a></b></td>
										<td>- Manages cookies for the project by setting, getting, and removing them using the 'js-cookie' library<br>- This utility simplifies cookie handling across the codebase, ensuring seamless interaction with browser cookies.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/shared/utils/countryCodeData.js'>countryCodeData.js</a></b></td>
										<td>- Provides common country codes for phone number input across various regions, enhancing user experience during phone number input validation and formatting<br>- This data file centralizes country-specific codes, ensuring consistency and accuracy in handling international phone numbers within the project's shared utilities module.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/shared/utils/dateUtils.js'>dateUtils.js</a></b></td>
										<td>- Provides utility functions for date and time formatting in reservations<br>- Functions include converting date and time formats, validating formats, and formatting IDs for display<br>- Supports transforming dates between MM/DD/YYYY and YYYY-MM-DD formats, and times between 12-hour and 24-hour formats<br>- Additionally, it validates date and time formats for accuracy.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/shared/utils/formatters.js'>formatters.js</a></b></td>
										<td>- Enhances data display and readability by formatting currency, percentages, day names, status labels, and method labels<br>- Improves user experience and visual presentation within the project's shared utility functions.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/shared/utils/timeUtils.js'>timeUtils.js</a></b></td>
										<td>Converts 24-hour time to 12-hour format for display purposes in the shared utilities module.</td>
									</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<details>
						<summary><b>profile</b></summary>
						<blockquote>
							<details>
								<summary><b>sections</b></summary>
								<blockquote>
									<details>
										<summary><b>MyOrders</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/profile/sections/MyOrders/MyOrders.jsx'>MyOrders.jsx</a></b></td>
												<td>- The MyOrders component in the project displays a user's order history and allows viewing detailed order information in a modal<br>- It enhances the user experience by presenting past orders in a structured table format and providing easy access to order details<br>- This component plays a crucial role in managing and visualizing order-related data within the application.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>MyAccount</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/profile/sections/MyAccount/MyAccount.module.css'>MyAccount.module.css</a></b></td>
												<td>- Define styling for the account settings page, including password change card, tabs, and submenu<br>- Ensure consistent design and user-friendly layout for a seamless user experience.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/profile/sections/MyAccount/MyAccount.jsx'>MyAccount.jsx</a></b></td>
												<td>- Manages user account details, password changes, and account deletion flow within the MyAccount section<br>- Displays account information, allows password updates, and handles account deletion with confirmation prompts<br>- Facilitates navigation between account sections through tabs<br>- Integrates with user authentication and routing functionalities.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>MyReservations</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/profile/sections/MyReservations/MyReservations.jsx'>MyReservations.jsx</a></b></td>
												<td>- Manages user reservations, allowing viewing, editing, and cancellation<br>- Displays upcoming reservation details, reservation history, and provides modal interfaces for managing and editing reservations<br>- Implements handlers for user interactions like managing, editing, and canceling reservations<br>- Supports seamless user experience for reservation management within the application.</td>
											</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<details>
								<summary><b>components</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/profile/components/TableComponents.module.css'>TableComponents.module.css</a></b></td>
										<td>Define styling rules for a responsive history table component, ensuring readability and user-friendly interaction.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/profile/components/ProfileLayout.module.css'>ProfileLayout.module.css</a></b></td>
										<td>- Define the layout styling for the profile page, ensuring a consistent and visually appealing user interface<br>- The code in the provided file establishes the structure, spacing, and design elements for the profile components, enhancing the overall user experience within the project architecture.</td>
									</tr>
									</table>
									<details>
										<summary><b>ReservationEditForm</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/profile/components/ReservationEditForm/FormComponents.module.css'>FormComponents.module.css</a></b></td>
												<td>- Define styling rules for form components like input fields, tabs, and warning messages<br>- Ensure consistent design and user experience across the profile module.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/profile/components/ReservationEditForm/ReservationEditForm.jsx'>ReservationEditForm.jsx</a></b></td>
												<td>- Enables editing reservation details by validating and updating date and time inputs<br>- Handles form submission and cancellation actions seamlessly within the reservation editing flow.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>ProfileSidebar</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/profile/components/ProfileSidebar/ProfileSidebar.jsx'>ProfileSidebar.jsx</a></b></td>
												<td>- ProfileSidebar component renders the profile page's navigation sidebar/header, allowing users to easily switch between account sections<br>- It includes a mobile-friendly menu toggle and logout functionality<br>- The component enhances user experience by providing seamless navigation within the profile page.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/profile/components/ProfileSidebar/ProfileSidebar.module.css'>ProfileSidebar.module.css</a></b></td>
												<td>- Define the styling for the profile sidebar component, including layout, colors, and responsiveness based on screen size<br>- The CSS rules handle the appearance and behavior of the sidebar, header, menu items, and logout button, ensuring a cohesive and user-friendly interface.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>Modal</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/profile/components/Modal/Modal.module.css'>Modal.module.css</a></b></td>
												<td>- Define the styling for a modal overlay and its components like header, body, and actions<br>- Control the appearance and behavior of the modal, including transitions and responsiveness.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/profile/components/Modal/Modal.jsx'>Modal.jsx</a></b></td>
												<td>- Implement a reusable Modal component in the project's profile module<br>- The component manages animations for opening and closing modals, including handling escape key presses and clicks outside the modal<br>- It ensures smooth user interactions and provides a visually appealing experience for displaying content within a modal dialog.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>ReservationHistory</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/profile/components/ReservationHistory/ReservationHistory.jsx'>ReservationHistory.jsx</a></b></td>
												<td>- Displays past reservations in a table, showcasing reservation details like ID, date, time, people, and status<br>- Allows users to manage reservations by viewing details<br>- If no history exists, a message is shown.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>StatusBadge</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/profile/components/StatusBadge/StatusBadge.jsx'>StatusBadge.jsx</a></b></td>
												<td>- Defines functions to determine status badge styling and format status for display<br>- The StatusBadge component utilizes these functions to render a status with appropriate styling based on the provided status value.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/profile/components/StatusBadge/StatusBadge.module.css'>StatusBadge.module.css</a></b></td>
												<td>Define status badge styles for different states in the profile module to visually represent status information.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>UpcominReservation</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/profile/components/UpcominReservation/UpcomingReservation.jsx'>UpcomingReservation.jsx</a></b></td>
												<td>Displays the next upcoming reservation details, allowing users to manage or cancel it.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/profile/components/UpcominReservation/UpcomingReservation.module.css'>UpcomingReservation.module.css</a></b></td>
												<td>- Defines styling for upcoming reservations component with a distinct top border color<br>- This file contributes to the project's modular architecture by encapsulating visual presentation details for the upcoming reservation section within the profile module.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>OrderDetail</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/profile/components/OrderDetail/OrderDetail.module.css'>OrderDetail.module.css</a></b></td>
												<td>- Define styling for order details and delivery address in the project's profile module<br>- The CSS file sets grid layout for orders, styles delivery address, and adjusts layout for different screen sizes.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/profile/components/OrderDetail/OrderDetail.jsx'>OrderDetail.jsx</a></b></td>
												<td>- The OrderDetail component in the provided code file renders detailed information for a single order, including order ID, date, status, total amount, delivery and payment methods, and order items displayed in a table format<br>- It also optionally displays the delivery address for home delivery orders.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>ReservationDetail</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/profile/components/ReservationDetail/ReservationDetail.module.css'>ReservationDetail.module.css</a></b></td>
												<td>- Define styling for reservation details, including fields, labels, values, and grid layout<br>- Implement responsive design for grid columns on larger screens.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/profile/components/ReservationDetail/ReservationDetail.jsx'>ReservationDetail.jsx</a></b></td>
												<td>- Displays reservation details including ID, date, time, number of people, and status<br>- Allows editing of reservations if not cancelled.</td>
											</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<details>
								<summary><b>hooks</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/profile/hooks/useOrders.js'>useOrders.js</a></b></td>
										<td>- Provides a custom hook for managing user orders by fetching and organizing data<br>- Handles loading states and errors, transforming order dates for display.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/profile/hooks/useProfileNavigation.js'>useProfileNavigation.js</a></b></td>
										<td>- Enables URL navigation and parsing for profile tabs and items, updating the active tab and selected items based on URL parameters<br>- Handles tab changes, viewing orders and reservations, and clearing selected items<br>- Facilitates seamless user navigation within the profile section of the application.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/profile/hooks/useReservations.js'>useReservations.js</a></b></td>
										<td>- Provides custom hook for managing user reservations, including fetching, updating, and canceling<br>- Transforms reservation data for display and handles errors gracefully<br>- Exposes functions to fetch upcoming reservations, cancel bookings, and reschedule reservations.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/profile/hooks/useUserDetails.js'>useUserDetails.js</a></b></td>
										<td>- Provides a custom hook to fetch and manage user details, handling loading states and errors<br>- It encapsulates logic for retrieving user data from the backend service, enhancing code modularity and reusability within the project's profile module architecture.</td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>pages</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/profile/pages/Profile.js'>Profile.js</a></b></td>
										<td>- Manages tab navigation and data fetching for the user's profile, including reservations, account details, and orders<br>- Handles account deletion functionality and utilizes custom hooks for navigation and data retrieval<br>- Renders the profile layout with a sidebar for navigation and main content based on the active tab.</td>
									</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<details>
						<summary><b>notFound</b></summary>
						<blockquote>
							<table>
							<tr>
								<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/notFound/NotFound.module.css'>NotFound.module.css</a></b></td>
								<td>- Define styling for the 404 error page to ensure a visually appealing and user-friendly experience<br>- The CSS in this file sets up the layout, typography, and interactive elements for the not found page, enhancing the overall look and feel of the application.</td>
							</tr>
							<tr>
								<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/notFound/NotFound.js'>NotFound.js</a></b></td>
								<td>Renders a 404 Not Found page with a message and a link to go back to the home page.</td>
							</tr>
							</table>
						</blockquote>
					</details>
					<details>
						<summary><b>reservation</b></summary>
						<blockquote>
							<details>
								<summary><b>components</b></summary>
								<blockquote>
									<details>
										<summary><b>Legend</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/reservation/components/Legend/Legend.module.css'>Legend.module.css</a></b></td>
												<td>- Define the styling for the legend container, items, and text in the reservation module<br>- Position the legend at the bottom center with a transparent background, suitable for displaying key information<br>- Adjust font size for mobile devices.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/reservation/components/Legend/Legend.jsx'>Legend.jsx</a></b></td>
												<td>- The Legend component renders a color-coded legend to display availability status<br>- It accepts a prop to adjust styling for mobile devices<br>- This component enhances user experience by providing a visual guide for availability status within the reservation module.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>LoadingState</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/reservation/components/LoadingState/LoadingState.module.css'>LoadingState.module.css</a></b></td>
												<td>- Define the visual layout for the loading state of the reservation component<br>- The CSS file specifies the styling for a loading container, spinner animation, and loading text to provide a user-friendly experience while data is being fetched.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/reservation/components/LoadingState/LoadingState.jsx'>LoadingState.jsx</a></b></td>
												<td>Displays a loading spinner and message to indicate ongoing processes.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>DateTimeForm</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/reservation/components/DateTimeForm/DateTimeForm.module.css'>DateTimeForm.module.css</a></b></td>
												<td>- Define the visual styling for the reservation form component, ensuring a cohesive and user-friendly interface<br>- The CSS rules establish layout, colors, transitions, and interactive elements for a seamless user experience.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/reservation/components/DateTimeForm/DateTimeForm.js'>DateTimeForm.js</a></b></td>
												<td>- The DateTimeForm component renders a reservation form for selecting date, start and end times, and number of guests<br>- It includes functionality to search for available tables based on the selected criteria<br>- This component plays a crucial role in facilitating the reservation process within the project's architecture.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>TableWithChairs</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/reservation/components/TableWithChairs/TableWithChairs.jsx'>TableWithChairs.jsx</a></b></td>
												<td>- Generates a visual representation of a table with chairs, accommodating both round and rectangular tables<br>- The component allows for interactive features like clicking on tables and displays various styles based on availability and selection status<br>- It handles chair positioning around tables and includes detailed styling for a realistic look.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/reservation/components/TableWithChairs/TableWithChairs.module.css'>TableWithChairs.module.css</a></b></td>
												<td>Define styling for a table with chairs component, including transitions and selected text appearance.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>ReservationModal</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/reservation/components/ReservationModal/ReservationModal.js'>ReservationModal.js</a></b></td>
												<td>- The ReservationModal component displays a modal for reserving a table with specified details<br>- It allows users to view and confirm reservation information such as date, time, and party size<br>- Users can interact with the modal to confirm or cancel reservations, with visual feedback on the processing status.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/reservation/components/ReservationModal/ReservationModal.module.css'>ReservationModal.module.css</a></b></td>
												<td>- Define the visual styling for a reservation modal, ensuring a professional and user-friendly interface<br>- The CSS file sets the layout, animations, and design elements for the modal overlay, content, header, buttons, and information display<br>- It enhances the overall user experience by providing a clear and aesthetically pleasing reservation interaction.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>Door</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/reservation/components/Door/Door.module.css'>Door.module.css</a></b></td>
												<td>Manages styling for the door component in the reservation module, contributing to a consistent and visually appealing user interface across the codebase.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/reservation/components/Door/Door.jsx'>Door.jsx</a></b></td>
												<td>- The Door component renders customizable doors with various types and states (open/closed) based on specified dimensions and properties<br>- It supports hinged, sliding, and double door types, allowing for interactive user interactions and visual representations within the reservation module of the project.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>ErrorState</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/reservation/components/ErrorState/ErrorState.module.css'>ErrorState.module.css</a></b></td>
												<td>- Define styling for error state display in the reservation module, ensuring a consistent and visually appealing user experience<br>- The CSS rules in this file control the layout, alignment, and color scheme for error messages, enhancing the overall presentation of error feedback within the reservation component.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/reservation/components/ErrorState/ErrorState.jsx'>ErrorState.jsx</a></b></td>
												<td>- The ErrorState component displays an error message with an icon<br>- It enhances user experience by providing clear feedback when errors occur in the reservation module of the project.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>Window</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/reservation/components/Window/Window.module.css'>Window.module.css</a></b></td>
												<td>Define styling rules for the reservation window component to ensure a consistent and visually appealing user interface across the project.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/reservation/components/Window/Window.jsx'>Window.jsx</a></b></td>
												<td>- Defines a customizable window component that renders different window types with specific properties like position, size, and rotation<br>- Handles user interactions and visual representations based on the window type and state.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>Wall</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/reservation/components/Wall/Wall.module.css'>Wall.module.css</a></b></td>
												<td>Define styling rules for the Wall component in the reservation module to ensure a consistent and visually appealing layout.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/reservation/components/Wall/Wall.jsx'>Wall.jsx</a></b></td>
												<td>- Defines a Wall component rendering a customizable wall with coordinates, thickness, and color<br>- Handles wall selection and click events, providing visual feedback<br>- Calculations for angle and length are included for accurate display<br>- The component encapsulates wall rendering logic for the reservation system.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>Chair</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/reservation/components/Chair/Chair.module.css'>Chair.module.css</a></b></td>
												<td>Improve styling consistency for chair components in the reservation module.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/reservation/components/Chair/Chair.jsx'>Chair.jsx</a></b></td>
												<td>- Defines a Chair component rendering a chair with specified position, color, and rotation<br>- Calculates chair dimensions and positions components accordingly.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>FloorPlan</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/reservation/components/FloorPlan/FloorPlan.jsx'>FloorPlan.jsx</a></b></td>
												<td>- Displays the restaurant floor plan with interactive elements like tables, walls, and doors<br>- Handles loading and error states, allowing selection of tables with a callback function<br>- Utilizes custom hooks for data retrieval and user interactions.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/reservation/components/FloorPlan/FloorPlan.module.css'>FloorPlan.module.css</a></b></td>
												<td>- Define the styling for the floor plan layout, table details, loading indicators, and error messages within the reservation module<br>- The CSS rules ensure a visually appealing and responsive display of floor plan components, with animations for loading states and error handling.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>FloorCanvas</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/reservation/components/FloorCanvas/FloorCanvas.jsx'>FloorCanvas.jsx</a></b></td>
												<td>- Render SVG canvas displaying floor plan elements like walls, doors, windows, and tables<br>- Utilizes components to visualize architectural layout with interactive features for selection and interaction<br>- Enhances user experience by providing a visual representation of the floor plan within the application.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/reservation/components/FloorCanvas/FloorCanvas.module.css'>FloorCanvas.module.css</a></b></td>
												<td>Define styling rules for the FloorCanvas component to ensure a consistent and visually appealing layout within the reservation module of the project.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>LoginPrompt</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/reservation/components/LoginPrompt/LoginPrompt.module.css'>LoginPrompt.module.css</a></b></td>
												<td>- Define the styling for the login prompt component, ensuring a visually appealing and user-friendly interface<br>- The CSS rules specify layout, typography, and button interactions to enhance the login experience for users accessing the reservation system.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/reservation/components/LoginPrompt/LoginPrompt.js'>LoginPrompt.js</a></b></td>
												<td>- Generates a LoginPrompt component that prompts users to log in for making reservations<br>- It includes a message encouraging users to log in to their account to reserve a table, along with a button to initiate the login process<br>- The component adjusts its layout based on the device type, ensuring a seamless user experience across different devices.</td>
											</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<details>
								<summary><b>hooks</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/reservation/hooks/useResponsiveView.js'>useResponsiveView.js</a></b></td>
										<td>- Manage device responsiveness by determining if the device is mobile using a custom hook<br>- The hook updates the state based on window resize events, returning a boolean value indicating mobile status.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/reservation/hooks/useFloorPlanData.js'>useFloorPlanData.js</a></b></td>
										<td>- Manages fetching and updating floor plan data, including tables, walls, doors, and windows<br>- Utilizes a custom hook to handle loading status and errors, ensuring accurate display of available tables within the floor plan<br>- Integrates with the floor plan service to retrieve and process layout details for seamless visualization.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/reservation/hooks/useSelection.js'>useSelection.js</a></b></td>
										<td>- Manages element selection in the floor plan, enabling callback on table selection<br>- Handles table clicks, updates selection state, and triggers parent component callback if provided<br>- Offers functionality to clear all selections.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/reservation/hooks/useReservationForm.js'>useReservationForm.js</a></b></td>
										<td>- Manages reservation form state and actions, including date, time, number of seats, and table availability<br>- Validates inputs, searches for free tables, and creates reservations<br>- Handles formatting date and time, error handling, and authentication checks<br>- Supports user interactions for booking tables based on specified criteria.</td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>pages</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/reservation/pages/ReserveTable.js'>ReserveTable.js</a></b></td>
										<td>- Implements a reservation page displaying an interactive floor plan and form<br>- Handles table selection, reservation confirmation, and modal closure<br>- Includes authentication checks and responsive design considerations.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/reservation/pages/ReserveTable.module.css'>ReserveTable.module.css</a></b></td>
										<td>- Define the styling for the reservation form and table display in the project's reservation module<br>- The CSS file sets the layout, colors, transitions, and responsiveness for the reservation form and table components, enhancing the user experience and visual appeal of the reservation feature.</td>
									</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<details>
						<summary><b>authentication</b></summary>
						<blockquote>
							<details>
								<summary><b>components</b></summary>
								<blockquote>
									<details>
										<summary><b>ErrorDisplay</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/authentication/components/ErrorDisplay/ErrorDisplay.jsx'>ErrorDisplay.jsx</a></b></td>
												<td>- Displays error messages in the authentication module, enhancing user experience by providing clear feedback<br>- The ErrorDisplay component renders the error message passed as a prop, ensuring users are informed of any issues during authentication processes.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/authentication/components/ErrorDisplay/ErrorDisplay.module.css'>ErrorDisplay.module.css</a></b></td>
												<td>- Define the styling for authentication error messages in the CSS module<br>- The code sets the appearance of error messages, including background color, text color, padding, and animation effects<br>- This module ensures consistent and visually appealing error displays across the authentication components in the project.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>RegisterForm</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/authentication/components/RegisterForm/RegisterForm.module.css'>RegisterForm.module.css</a></b></td>
												<td>Defines styling for the registration form, including input fields, buttons, and layout adjustments for responsiveness.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/authentication/components/RegisterForm/RegisterForm.jsx'>RegisterForm.jsx</a></b></td>
												<td>- The RegisterForm component renders a user registration form with fields for personal details, email, password, and phone number<br>- It includes functionality to handle input changes, form submission, and toggling the country code dropdown<br>- Users can switch to the login form and register with ease.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>HomeButton</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/authentication/components/HomeButton/HomeButton.module.css'>HomeButton.module.css</a></b></td>
												<td>Define a styled button for returning to the home page, enhancing user experience with a visually appealing and interactive element.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/authentication/components/HomeButton/HomeButton.jsx'>HomeButton.jsx</a></b></td>
												<td>Implements a home button component for navigation in the project's authentication module.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>ResetSuccessMessage</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/authentication/components/ResetSuccessMessage/ResetSuccessMessage.jsx'>ResetSuccessMessage.jsx</a></b></td>
												<td>- Displays a success message post password reset, prompting users to check their email for further instructions<br>- Allows users to return to the login page.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/authentication/components/ResetSuccessMessage/ResetSuccessMessage.module.css'>ResetSuccessMessage.module.css</a></b></td>
												<td>Define styling for authentication success message and related components with animations and transitions for a visually appealing user experience.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>LoginForm</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/authentication/components/LoginForm/LoginForm.module.css'>LoginForm.module.css</a></b></td>
												<td>- Define the styling for the authentication form, including input fields, buttons, and switch options<br>- Encourages a user-friendly design with responsive interactions.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/authentication/components/LoginForm/LoginForm.jsx'>LoginForm.jsx</a></b></td>
												<td>- Defines a login form component that handles user authentication<br>- Allows users to input email and password, submit the form, and switch to the registration form if needed<br>- Integrates with the project's authentication module and maintains a clean user interface.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>SocialAuthButtons</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/authentication/components/SocialAuthButtons/SocialAuthButtons.jsx'>SocialAuthButtons.jsx</a></b></td>
												<td>- Enables social authentication with Google and Facebook, presenting buttons for users to sign in<br>- Handles loading state and triggers respective authentication functions.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/authentication/components/SocialAuthButtons/SocialAuthButtons.module.css'>SocialAuthButtons.module.css</a></b></td>
												<td>- Define styling for social authentication buttons with various providers, enhancing user experience and visual appeal<br>- Encourages user interaction through hover effects and disabled state styling<br>- Ensures consistent design across different screen sizes for a seamless authentication process.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>AuthHeader</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/authentication/components/AuthHeader/AuthHeader.module.css'>AuthHeader.module.css</a></b></td>
												<td>- Define the styling for the return home button in the authentication module<br>- The button is positioned at the top left with a distinctive design, including a hover effect and responsive adjustments for smaller screens<br>- It enhances the user experience by providing a visually appealing and functional element for navigating back to the home page.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/authentication/components/AuthHeader/AuthHeader.jsx'>AuthHeader.jsx</a></b></td>
												<td>- Defines an authentication header component for the project, displaying a home button and title<br>- It offers functionality to navigate back to the home page.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>ForgotPasswordForm</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/authentication/components/ForgotPasswordForm/ForgotPasswordForm.jsx'>ForgotPasswordForm.jsx</a></b></td>
												<td>- Generates a form for users to request a password reset by entering their email address<br>- Displays form errors, sends reset link, and allows users to return to login page.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/authentication/components/ForgotPasswordForm/ForgotPasswordForm.module.css'>ForgotPasswordForm.module.css</a></b></td>
												<td>- Define consistent styling for authentication form components like headers, input fields, buttons, and links<br>- Ensure a visually appealing and user-friendly interface for the forgot password form in the authentication module.</td>
											</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<details>
								<summary><b>hooks</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/authentication/hooks/useAuthForm.js'>useAuthForm.js</a></b></td>
										<td>- Manages authentication form state, logic, and handlers for login, registration, and social authentication<br>- Handles form validation, error messages, and redirects based on user authentication status<br>- Provides functions for form field changes, country code selection, and toggling dropdown visibility<br>- Ensures secure and user-friendly authentication experience within the project architecture.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/authentication/hooks/useForgotPassword.js'>useForgotPassword.js</a></b></td>
										<td>- Facilitates handling forgot password functionality by managing state, form submission, and navigation<br>- Validates email format, triggers password reset, and displays success/error messages<br>- Encapsulates logic for seamless user experience during password recovery process.</td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>pages</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/authentication/pages/Auth.module.css'>Auth.module.css</a></b></td>
										<td>- Define the styling for the authentication module's user interface, ensuring a visually appealing and responsive layout<br>- The CSS file sets the design elements such as background, card layout, headers, and animations to enhance the user experience during the authentication process.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/authentication/pages/Auth.jsx'>Auth.jsx</a></b></td>
										<td>- Implements an authentication component for handling login and registration<br>- Renders UI elements such as forms, error displays, and social authentication buttons<br>- Manages form data, loading states, and user interactions for seamless authentication processes.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/authentication/pages/ForgotPassword.jsx'>ForgotPassword.jsx</a></b></td>
										<td>- Implements the ForgotPassword component for resetting user passwords<br>- Handles user interactions and displays appropriate forms based on submission status<br>- Integrates with authentication hooks for seamless functionality within the project's authentication module.</td>
									</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<details>
						<summary><b>location</b></summary>
						<blockquote>
							<details>
								<summary><b>components</b></summary>
								<blockquote>
									<details>
										<summary><b>DayHours</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/location/components/DayHours/DayHours.js'>DayHours.js</a></b></td>
												<td>- The DayHours component in the location module renders the opening hours for a specific day of the week<br>- It takes the day and corresponding hours as props and displays them in a structured format<br>- This component contributes to the user interface by providing clear visibility of daily operating hours.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/location/components/DayHours/DayHours.module.css'>DayHours.module.css</a></b></td>
												<td>- Define styling for the DayHours component, ensuring a consistent and visually appealing layout<br>- The CSS rules in this file establish the structure and design of the DayHours module, enhancing the user experience by organizing and styling the display of day and hour information.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>icons</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/location/components/icons/EmailIcon.js'>EmailIcon.js</a></b></td>
												<td>- Define a React component that renders an email icon in SVG format<br>- The component sets specific attributes for size, color, and stroke width<br>- This EmailIcon component is located within the location module of the project's component directory, contributing to the visual representation of email-related features.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/location/components/icons/PhoneIcon.js'>PhoneIcon.js</a></b></td>
												<td>Render a PhoneIcon SVG component for displaying phone icons in the location module.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/location/components/icons/ClockIcon.js'>ClockIcon.js</a></b></td>
												<td>- The ClockIcon component renders an SVG clock icon for the location module in the project<br>- It contributes to the visual representation of time-related elements within the user interface, enhancing the overall user experience.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/location/components/icons/LocationPin.js'>LocationPin.js</a></b></td>
												<td>Render a LocationPin SVG icon for displaying location markers within the project's location module.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>Map</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/location/components/Map/Map.module.css'>Map.module.css</a></b></td>
												<td>- Define styling for a responsive map container with hover effects and transitions<br>- The CSS file in the location module sets properties for a map container and map iframe, ensuring a clean and interactive user experience.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/location/components/Map/Map.js'>Map.js</a></b></td>
												<td>Render Google Maps iframe based on AuthContext configuration in the Map component.</td>
											</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<details>
								<summary><b>hooks</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/location/hooks/useFormattedOpeningHours.js'>useFormattedOpeningHours.js</a></b></td>
										<td>- Formats opening hours data for improved readability by filtering and mapping the provided array of objects<br>- Capitalizes the day and converts the time to a 12-hour format using a utility function.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/location/hooks/useOpeningHours.js'>useOpeningHours.js</a></b></td>
										<td>- Fetches and manages opening hours data, providing loading and error states<br>- The custom hook interacts with the openingHoursService to retrieve all opening hours, updating the UI accordingly.</td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>pages</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/location/pages/Location.module.css'>Location.module.css</a></b></td>
										<td>- Defines styling for a location page, including sections for contact info, map, and operating hours<br>- Utilizes CSS grid for layout and transitions for interactive elements<br>- Ensures responsive design for various screen sizes.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/location/pages/Location.js'>Location.js</a></b></td>
										<td>- The LocationSection component renders contact information, opening hours, and a map for a specific location<br>- It utilizes various components and hooks to display details such as address, contact information, and interactive buttons for calling or emailing<br>- This component serves as a central point for showcasing essential location-related data within the project's architecture.</td>
									</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<details>
						<summary><b>checkout</b></summary>
						<blockquote>
							<details>
								<summary><b>components</b></summary>
								<blockquote>
									<details>
										<summary><b>PersonalDetails</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/checkout/components/PersonalDetails/PersonalDetails.jsx'>PersonalDetails.jsx</a></b></td>
												<td>- Displays personal details for a checkout process, allowing users to view and edit their information<br>- The component includes fields for name, email, and phone number, with options to expand or collapse the section<br>- It also indicates completion status visually<br>- This component enhances the user experience by providing a seamless checkout flow.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/checkout/components/PersonalDetails/PersonalDetails.module.css'>PersonalDetails.module.css</a></b></td>
												<td>- Define the visual styling for the checkout process, enhancing user experience by providing a clean and interactive interface<br>- The CSS file in the specified path governs the appearance of each step, ensuring a seamless transition and clear progression for users.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>ErrorMessage</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/checkout/components/ErrorMessage/ErrorMessage.jsx'>ErrorMessage.jsx</a></b></td>
												<td>Displays error messages in the checkout process based on provided input.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/checkout/components/ErrorMessage/ErrorMessage.module.css'>ErrorMessage.module.css</a></b></td>
												<td>- Define consistent styling for error messages in the checkout module to ensure a cohesive user experience<br>- The ErrorMessage module CSS file establishes a visually distinct and informative format for error messages, enhancing readability and user interaction within the checkout process.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>CollectionMethod</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/checkout/components/CollectionMethod/CollectionMethod.module.css'>CollectionMethod.module.css</a></b></td>
												<td>Define the visual styling for the checkout collection method component, enhancing user experience by providing a clean and interactive interface.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/checkout/components/CollectionMethod/CollectionMethod.jsx'>CollectionMethod.jsx</a></b></td>
												<td>- The CollectionMethod component facilitates selection of collection methods during the checkout process, based on user preferences and feature flags<br>- It dynamically renders options for order pickup or home delivery, allowing users to choose their preferred method seamlessly<br>- The component also handles address input fields for home delivery, enhancing the overall checkout experience.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>OrderSummary</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/checkout/components/OrderSummary/OrderSummary.jsx'>OrderSummary.jsx</a></b></td>
												<td>- The OrderSummary component displays a summary of the user's order, showcasing cart items, total price, and actions to place the order<br>- It integrates with the cart, menu items, and order processing functions to provide a seamless checkout experience for users.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/checkout/components/OrderSummary/OrderSummary.module.css'>OrderSummary.module.css</a></b></td>
												<td>- Define the visual styling for the order summary component, enhancing the checkout experience by presenting a structured and appealing layout for displaying cart items, quantities, prices, and a prominent place order button<br>- The CSS rules ensure a responsive design that adapts to various screen sizes for optimal user interaction.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>OrderProcessingModal</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/checkout/components/OrderProcessingModal/OrderProcessingModal.jsx'>OrderProcessingModal.jsx</a></b></td>
												<td>- Displays a modal indicating order processing status, with animations and redirects based on order and payment status<br>- Manages countdown for redirecting after successful online payment<br>- Handles success, error, and processing states with corresponding UI elements.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/checkout/components/OrderProcessingModal/OrderProcessingModal.module.css'>OrderProcessingModal.module.css</a></b></td>
												<td>- Define the visual styling for the order processing modal, including overlay, content layout, loader animations, success/error indicators, and action buttons<br>- Implement keyframe animations for fade-in, slide-up, spin, bounce-in, and shake effects to enhance user experience during order processing.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>LoginOverlay</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/checkout/components/LoginOverlay/LoginOverlay.module.css'>LoginOverlay.module.css</a></b></td>
												<td>Define the styling for the login overlay component, ensuring a visually appealing and user-friendly login experience.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/checkout/components/LoginOverlay/LoginOverlay.jsx'>LoginOverlay.jsx</a></b></td>
												<td>- The LoginOverlay component prompts users to log in to proceed with their order<br>- It includes options to either log in or return to the menu<br>- This component enhances the checkout process by providing a seamless login experience within the application architecture.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>PaymentMethod</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/checkout/components/PaymentMethod/PaymentMethod.jsx'>PaymentMethod.jsx</a></b></td>
												<td>- The PaymentMethod component facilitates the selection of payment methods during the checkout process<br>- It dynamically displays available payment options based on the chosen collection method, ensuring a seamless user experience<br>- This component leverages feature flags to enable or disable specific payment methods, enhancing flexibility and customization within the checkout flow.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/checkout/components/PaymentMethod/PaymentMethod.module.css'>PaymentMethod.module.css</a></b></td>
												<td>Define the visual styling for the payment method selection interface, enhancing user experience and interaction.</td>
											</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<details>
								<summary><b>hooks</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/checkout/hooks/useCheckout.js'>useCheckout.js</a></b></td>
										<td>- Manages the checkout process by handling collection and payment methods, address validation, and order placement<br>- Provides state and functions for toggling content, managing modals, and processing orders<br>- Enables seamless user interaction and order fulfillment within the project's checkout flow.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/checkout/hooks/useCart.js'>useCart.js</a></b></td>
										<td>- Manages shopping cart state and operations, including adding/removing items, calculating total price, and clearing the cart<br>- Utilizes local storage for persistence and fetches menu items from the server<br>- Provides essential functions for handling the cart within the checkout module.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/checkout/hooks/useUserDetails.js'>useUserDetails.js</a></b></td>
										<td>- Manages user details and login redirection within the checkout module<br>- Retrieves user information and handles redirects to the login page if needed<br>- Integrates with authentication context and user service to provide a seamless user experience during the checkout process.</td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>pages</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/checkout/pages/Checkout.module.css'>Checkout.module.css</a></b></td>
										<td>Define the visual layout for the checkout page, ensuring responsiveness across devices.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/checkout/pages/Checkout.js'>Checkout.js</a></b></td>
										<td>- Manages the checkout process by displaying personal details, collection and payment methods, and order summary<br>- Handles state and operations related to checkout, ensuring a smooth user experience<br>- Includes features like error handling, login overlay, and order processing modal<br>- Supports seamless navigation and redirects based on user actions.</td>
									</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<details>
						<summary><b>dashboard</b></summary>
						<blockquote>
							<details>
								<summary><b>sections</b></summary>
								<blockquote>
									<details>
										<summary><b>PendingReservations</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/PendingReservations/PendingReservations.jsx'>PendingReservations.jsx</a></b></td>
												<td>- Displays a list of pending reservations with options to approve or reject each reservation<br>- The component takes in pending reservations and functions to handle approval/rejection<br>- If there are no pending reservations, it shows an empty state message<br>- Otherwise, it renders reservation details and action buttons for each reservation.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/PendingReservations/PendingReservations.module.css'>PendingReservations.module.css</a></b></td>
												<td>- Define the visual styling for pending reservation components in the dashboard section<br>- Includes layout, card design, guest information, action buttons, and responsive adjustments for smaller screens.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>AllReservations</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/AllReservations/AllReservations.js'>AllReservations.js</a></b></td>
												<td>- Manages display and filtering of reservations, featuring a main component with a results counter and reservations table<br>- Utilizes a filter sidebar for visibility toggling and filter options<br>- Custom hook enables filtering functionality based on reservation data.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/AllReservations/AllReservations.module.css'>AllReservations.module.css</a></b></td>
												<td>- Define the layout styling for the dashboard's reservation section, ensuring a responsive and visually appealing display<br>- The code in the provided file establishes the container and content styling, maintaining a structured and user-friendly interface for managing reservations within the application.</td>
											</tr>
											</table>
											<details>
												<summary><b>components</b></summary>
												<blockquote>
													<details>
														<summary><b>ResultCounter</b></summary>
														<blockquote>
															<table>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/AllReservations/components/ResultCounter/ResultsCounter.module.css'>ResultsCounter.module.css</a></b></td>
																<td>- Define the styling for the results count display in the All Reservations section of the dashboard<br>- The CSS module sets the font size, color, margin, and font weight for the results count element, ensuring a consistent and visually appealing presentation within the dashboard interface.</td>
															</tr>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/AllReservations/components/ResultCounter/ResultsCounter.js'>ResultsCounter.js</a></b></td>
																<td>Displays reservation count after filtering in the dashboard section.</td>
															</tr>
															</table>
														</blockquote>
													</details>
													<details>
														<summary><b>ReservationTable</b></summary>
														<blockquote>
															<table>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/AllReservations/components/ReservationTable/ReservationsTable.module.css'>ReservationsTable.module.css</a></b></td>
																<td>- Define the styling for a reservation table, including layout, font sizes, colors, and responsiveness for different screen sizes<br>- The CSS rules ensure a clean and organized display of reservation data, with distinct badges for status indicators and guest counts<br>- The design prioritizes readability and user experience across various devices.</td>
															</tr>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/AllReservations/components/ReservationTable/ReservationsTable.jsx'>ReservationsTable.jsx</a></b></td>
																<td>- Displays reservations in a table format based on provided data<br>- Categorizes reservations by name, date, time, guests, table, contact, and status<br>- Handles cases where no reservations match filters, showing an appropriate message.</td>
															</tr>
															</table>
														</blockquote>
													</details>
													<details>
														<summary><b>FilterSidebar</b></summary>
														<blockquote>
															<table>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/AllReservations/components/FilterSidebar/FilterSidebar.jsx'>FilterSidebar.jsx</a></b></td>
																<td>- Enables filtering of reservations based on various criteria such as name, date, time, table, and status<br>- Provides options to clear filters and toggle sidebar visibility.</td>
															</tr>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/AllReservations/components/FilterSidebar/FilterSidebar.module.css'>FilterSidebar.module.css</a></b></td>
																<td>- Define the styling for the filter sidebar component in the dashboard section<br>- It controls the appearance and behavior of the sidebar when filtering reservations<br>- The CSS rules handle the sidebar's width, position, transitions, and various styling elements like headers, inputs, and buttons.</td>
															</tr>
															</table>
														</blockquote>
													</details>
												</blockquote>
											</details>
											<details>
												<summary><b>hooks</b></summary>
												<blockquote>
													<table>
													<tr>
														<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/AllReservations/hooks/useReservationFilters.js'>useReservationFilters.js</a></b></td>
														<td>- Manages reservation filters and results based on user input, ensuring dynamic filtering of reservations by name, date, time, table, and status<br>- Updates filtered results in real-time, allowing users to easily search and view specific reservations within the dashboard section of the application.</td>
													</tr>
													</table>
												</blockquote>
											</details>
										</blockquote>
									</details>
									<details>
										<summary><b>Orders</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/Orders/OrderManagement.jsx'>OrderManagement.jsx</a></b></td>
												<td>- Manages the display, filtering, and detailed view of orders within the dashboard section<br>- Handles order selection, status updates, and filter application<br>- Displays loading indicator when orders are loading<br>- Allows users to view order details, update order status, and apply/reset temporary filters.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/Orders/OrderManagement.module.css'>OrderManagement.module.css</a></b></td>
												<td>Manages styling for the Orders section in the dashboard, ensuring a consistent and visually appealing user interface.</td>
											</tr>
											</table>
											<details>
												<summary><b>components</b></summary>
												<blockquote>
													<details>
														<summary><b>OrderFilters</b></summary>
														<blockquote>
															<table>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/Orders/components/OrderFilters/OrderFilters.module.css'>OrderFilters.module.css</a></b></td>
																<td>- Define the visual styling for the order filters section in the dashboard, including layout, animations, and interactive elements<br>- This CSS module controls the appearance and behavior of the order filters overlay, header, buttons, input fields, and date selection components<br>- It ensures a cohesive and user-friendly design for managing and applying filters in the dashboard interface.</td>
															</tr>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/Orders/components/OrderFilters/OrderFilters.js'>OrderFilters.js</a></b></td>
																<td>- Enables filtering orders by status and date range with a user-friendly interface<br>- Handles status and date range changes, visibility toggling, and filter application and reset<br>- Supports selecting status options and date ranges, with the ability to clear dates<br>- Facilitates seamless filtering and management of orders within the dashboard section.</td>
															</tr>
															</table>
														</blockquote>
													</details>
													<details>
														<summary><b>OrderList</b></summary>
														<blockquote>
															<table>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/Orders/components/OrderList/OrderList.jsx'>OrderList.jsx</a></b></td>
																<td>- Displays a list of orders with details and actions, handling order selection and status updates<br>- Formats date, time, status, payment, and delivery methods for display<br>- Includes an empty state message if no orders are present.</td>
															</tr>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/Orders/components/OrderList/OrderList.module.css'>OrderList.module.css</a></b></td>
																<td>- Define the styling for the order list component, including table layout, row hover effects, status badges, and action buttons<br>- Responsiveness is ensured with media queries for smaller screens.</td>
															</tr>
															</table>
														</blockquote>
													</details>
													<details>
														<summary><b>OrderDetails</b></summary>
														<blockquote>
															<table>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/Orders/components/OrderDetails/OrderDetails.jsx'>OrderDetails.jsx</a></b></td>
																<td>- The OrderDetails component displays detailed information about an order, including items, status, and actions to update the status<br>- It handles rendering order details, formatting data for display, and providing functionality to update the order status<br>- This component enhances the user experience by presenting comprehensive order information and enabling status updates seamlessly.</td>
															</tr>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/Orders/components/OrderDetails/OrderDetails.module.css'>OrderDetails.module.css</a></b></td>
																<td>- Defines styles for a modal displaying order details, ensuring a sleek and user-friendly interface<br>- The CSS file governs layout, animations, and color schemes for a visually appealing presentation of order information.</td>
															</tr>
															</table>
														</blockquote>
													</details>
												</blockquote>
											</details>
										</blockquote>
									</details>
									<details>
										<summary><b>Loading</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/Loading/LoadingIndicator.jsx'>LoadingIndicator.jsx</a></b></td>
												<td>- Create a LoadingIndicator component to display a loading spinner with optional text<br>- Customize the size and fullscreen display, enhancing user experience during data fetching.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/Loading/LoadingIndicator.module.css'>LoadingIndicator.module.css</a></b></td>
												<td>Define loading indicator styles for different screen sizes and create a visually appealing loading animation with spinning dots and text pulse effects.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>EmployeeManagement</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/EmployeeManagement/EmployeeManagement.module.css'>EmployeeManagement.module.css</a></b></td>
												<td>Define the styling for the employee dashboard section in the project's architecture.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/EmployeeManagement/EmployeeManagement.jsx'>EmployeeManagement.jsx</a></b></td>
												<td>- Manages employee operations by displaying a table and handling employee-related actions<br>- Includes features for adding new employees, changing roles, and removing employees<br>- Utilizes custom hooks for form handling and role management<br>- Main component for overseeing employee management within the project architecture.</td>
											</tr>
											</table>
											<details>
												<summary><b>components</b></summary>
												<blockquote>
													<details>
														<summary><b>EmployeeTable</b></summary>
														<blockquote>
															<table>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/EmployeeManagement/components/EmployeeTable/EmployeeTable.jsx'>EmployeeTable.jsx</a></b></td>
																<td>- Displays employee information in a table format, including ID, name, email, phone, and role<br>- Handles scenarios where no employees are found<br>- Utilizes an ActionMenu component for role changes and user deletions<br>- Designed to present employee data effectively within the dashboard section of the project.</td>
															</tr>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/EmployeeManagement/components/EmployeeTable/EmployeeTable.module.css'>EmployeeTable.module.css</a></b></td>
																<td>- Define the styling for the employee table component, ensuring a clean and professional layout<br>- The CSS rules handle table structure, cell formatting, role badges, and responsive design for various screen sizes.</td>
															</tr>
															</table>
														</blockquote>
													</details>
													<details>
														<summary><b>ActionMenu</b></summary>
														<blockquote>
															<table>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/EmployeeManagement/components/ActionMenu/ActionMenu.jsx'>ActionMenu.jsx</a></b></td>
																<td>- Implements an ActionMenu component for managing employee actions in the dashboard<br>- Displays a dropdown menu with options to change roles or delete users<br>- Handles user interactions and triggers corresponding functions<br>- Enhances user experience by providing a seamless interface for managing employee data.</td>
															</tr>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/EmployeeManagement/components/ActionMenu/ActionMenu.module.css'>ActionMenu.module.css</a></b></td>
																<td>- Define styling for action menu components in the Employee Management section, including buttons, icons, and menu items<br>- Implement hover effects and color schemes for a visually appealing user interface.</td>
															</tr>
															</table>
														</blockquote>
													</details>
													<details>
														<summary><b>AddEmployeeModal</b></summary>
														<blockquote>
															<table>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/EmployeeManagement/components/AddEmployeeModal/AddEmployeeModal.module.css'>AddEmployeeModal.module.css</a></b></td>
																<td>Define the visual styling for an employee addition modal in the dashboard section.</td>
															</tr>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/EmployeeManagement/components/AddEmployeeModal/AddEmployeeModal.jsx'>AddEmployeeModal.jsx</a></b></td>
																<td>- Enables adding new employees via a modal form with input validation<br>- Handles form submission, input changes, and modal closure<br>- Provides fields for first name, last name, email, phone, password, confirm password, and role selection<br>- Supports error feedback for each field.</td>
															</tr>
															</table>
														</blockquote>
													</details>
													<details>
														<summary><b>ChangeRoleModal</b></summary>
														<blockquote>
															<table>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/EmployeeManagement/components/ChangeRoleModal/ChangeRoleModal.jsx'>ChangeRoleModal.jsx</a></b></td>
																<td>- Enables role changes for employees in the dashboard section<br>- Displays a modal for selecting and saving a new role for a specific employee<br>- Supports role selection and provides options to cancel or save changes.</td>
															</tr>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/EmployeeManagement/components/ChangeRoleModal/ChangeRoleModal.module.css'>ChangeRoleModal.module.css</a></b></td>
																<td>Define the visual styling for the employee role change modal, ensuring a professional and user-friendly interface.</td>
															</tr>
															</table>
														</blockquote>
													</details>
												</blockquote>
											</details>
											<details>
												<summary><b>hooks</b></summary>
												<blockquote>
													<table>
													<tr>
														<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/EmployeeManagement/hooks/useRoleManagement.js'>useRoleManagement.js</a></b></td>
														<td>- Facilitates employee role management by providing state management and event handlers for updating roles<br>- The hook integrates with the backend to modify employee roles, displaying a modal for role selection and saving changes<br>- This functionality enhances the dashboard's employee management section, streamlining role adjustments within the application.</td>
													</tr>
													<tr>
														<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/EmployeeManagement/hooks/useEmployeeForm.js'>useEmployeeForm.js</a></b></td>
														<td>- Manages employee form state, validation, and submission for creating new employees<br>- Handles input changes, form validation, error handling, and dialog management<br>- Integrates with the backend to add new employees and resets the form upon submission or closure.</td>
													</tr>
													</table>
												</blockquote>
											</details>
										</blockquote>
									</details>
									<details>
										<summary><b>RestaurantConfig</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/RestaurantConfig/RestaurantConfig.module.css'>RestaurantConfig.module.css</a></b></td>
												<td>- Define the styling for the restaurant configuration section, including notifications, grid layout, form elements, and feature displays<br>- Implement animations, color schemes, and interactive toggles for user-friendly interaction within the dashboard module.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/RestaurantConfig/RestaurantConfig.jsx'>RestaurantConfig.jsx</a></b></td>
												<td>- Manages restaurant configuration settings, including contact info, address, map location, and features<br>- Handles loading state and allows editing and saving of information<br>- Provides a user-friendly interface for managing various aspects of a restaurant's online presence.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>AnalyticsDashboard</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/AnalyticsDashboard/AnalyticsDashboard.module.css'>AnalyticsDashboard.module.css</a></b></td>
												<td>- Define the layout for the Analytics Dashboard section by organizing elements in a column with specified spacing and width<br>- Additionally, style the content section with a specific margin to enhance visual hierarchy and readability within the dashboard interface.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/AnalyticsDashboard/AnalyticsDashboard.jsx'>AnalyticsDashboard.jsx</a></b></td>
												<td>- The AnalyticsDashboard component orchestrates the display of various analytics sections based on user interaction<br>- It manages data fetching, error handling, and loading states while rendering summary cards, filter bars, and navigation tabs for a comprehensive analytics dashboard experience.</td>
											</tr>
											</table>
											<details>
												<summary><b>components</b></summary>
												<blockquote>
													<table>
													<tr>
														<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/AnalyticsDashboard/components/Error.module.css'>Error.module.css</a></b></td>
														<td>Define the styling for error messages and retry buttons in the Analytics Dashboard section, ensuring a consistent and user-friendly display for error handling scenarios.</td>
													</tr>
													</table>
													<details>
														<summary><b>sections</b></summary>
														<blockquote>
															<table>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/AnalyticsDashboard/components/sections/Orders.jsx'>Orders.jsx</a></b></td>
																<td>- Generates the Orders component to display analytics data on orders, including orders by status, payment method, delivery method, and average completion time<br>- Utilizes BarChartComponent, PieChartComponent, and CenteredMetric for visual representation<br>- Organizes and formats data for clear insights into order analytics.</td>
															</tr>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/AnalyticsDashboard/components/sections/Revenue.jsx'>Revenue.jsx</a></b></td>
																<td>- Displays revenue analytics data through pie and bar charts, along with key metrics<br>- Filters and formats data for payment and delivery methods, weekly revenue, total revenue, and average order value<br>- Provides insights into revenue performance within a specified time range.</td>
															</tr>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/AnalyticsDashboard/components/sections/MenuItems.jsx'>MenuItems.jsx</a></b></td>
																<td>- Displays analytics data for menu items through various charts and metrics<br>- Extracts top and bottom items by quantity, top items by revenue, and average preparation time<br>- Utilizes BarChartComponent and CenteredMetric for visualization<br>- Organizes data in a grid layout for easy consumption.</td>
															</tr>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/AnalyticsDashboard/components/sections/Summary.jsx'>Summary.jsx</a></b></td>
																<td>- Displays a summary of analytics data through various charts, including revenue trends, order status distribution, top menu items, and reservations by day<br>- The component organizes and visualizes key metrics for easy interpretation and decision-making within the analytics dashboard section of the project.</td>
															</tr>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/AnalyticsDashboard/components/sections/Reservations.jsx'>Reservations.jsx</a></b></td>
																<td>- Displays analytics data for reservations including reservations by day of week, reservations by status, table popularity, and reservation statistics<br>- Utilizes bar and pie charts along with metrics grid to present the data in a visually appealing manner.</td>
															</tr>
															</table>
														</blockquote>
													</details>
													<details>
														<summary><b>common</b></summary>
														<blockquote>
															<details>
																<summary><b>NavigationTabs</b></summary>
																<blockquote>
																	<table>
																	<tr>
																		<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/AnalyticsDashboard/components/common/NavigationTabs/NavigationTabs.module.css'>NavigationTabs.module.css</a></b></td>
																		<td>- Define styling for navigation tabs in the Analytics Dashboard section, ensuring a consistent and user-friendly interface<br>- The code in the provided file enhances the visual presentation by styling tab elements with specific attributes like padding, colors, and transitions<br>- This contributes to a seamless user experience within the dashboard module of the project.</td>
																	</tr>
																	<tr>
																		<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/AnalyticsDashboard/components/common/NavigationTabs/NavigationTabs.jsx'>NavigationTabs.jsx</a></b></td>
																		<td>- Creates a NavigationTabs component for switching between different sections in the Analytics Dashboard<br>- Displays tabs for Overview, Revenue, Orders, Menu Items, and Reservations<br>- Allows users to click on tabs to switch sections easily.</td>
																	</tr>
																	</table>
																</blockquote>
															</details>
															<details>
																<summary><b>SummaryCard</b></summary>
																<blockquote>
																	<table>
																	<tr>
																		<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/AnalyticsDashboard/components/common/SummaryCard/SummaryCards.jsx'>SummaryCards.jsx</a></b></td>
																		<td>- Displays summary information for the dashboard, including today's revenue, orders, and reservations<br>- Utilizes props for dashboard and operational analytics data to render dynamic content.</td>
																	</tr>
																	<tr>
																		<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/AnalyticsDashboard/components/common/SummaryCard/SummaryCards.module.css'>SummaryCards.module.css</a></b></td>
																		<td>- Define the styling for summary cards in the Analytics Dashboard section<br>- The CSS file specifies the layout, colors, and typography for displaying key data points.</td>
																	</tr>
																	</table>
																</blockquote>
															</details>
															<details>
																<summary><b>FilterBar</b></summary>
																<blockquote>
																	<table>
																	<tr>
																		<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/AnalyticsDashboard/components/common/FilterBar/FilterBar.module.css'>FilterBar.module.css</a></b></td>
																		<td>- Define the styling for the filter bar component in the Analytics Dashboard section<br>- The CSS rules specify the layout, alignment, and appearance of filter elements within the filter bar, enhancing the user interface of the analytics dashboard.</td>
																	</tr>
																	<tr>
																		<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/AnalyticsDashboard/components/common/FilterBar/FilterBar.jsx'>FilterBar.jsx</a></b></td>
																		<td>- Enables users to select a time range for analytics data visualization in the dashboard<br>- The FilterBar component offers options for the last 7, 30, or 90 days, allowing users to dynamically update the displayed data based on their selection.</td>
																	</tr>
																	</table>
																</blockquote>
															</details>
														</blockquote>
													</details>
													<details>
														<summary><b>charts</b></summary>
														<blockquote>
															<table>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/AnalyticsDashboard/components/charts/LineChartComponent.jsx'>LineChartComponent.jsx</a></b></td>
																<td>- Generates a responsive line chart component for analytics dashboards, allowing customization of data, axes, colors, and tooltips<br>- The component enhances data visualization capabilities within the dashboard section of the project, providing a clear and interactive way to display trends and insights.</td>
															</tr>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/AnalyticsDashboard/components/charts/ChartComponents.module.css'>ChartComponents.module.css</a></b></td>
																<td>- Define consistent styling for various dashboard components to ensure a cohesive and visually appealing user interface<br>- Implement specific design attributes like background color, border radius, and box shadow to enhance the overall presentation of analytics charts and metrics.</td>
															</tr>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/AnalyticsDashboard/components/charts/BarChartComponent.jsx'>BarChartComponent.jsx</a></b></td>
																<td>- Generates a responsive bar chart component for the Analytics Dashboard section<br>- Displays data with customizable features like tooltips, legends, and axis labels<br>- Enhances data visualization and analysis within the project's dashboard module.</td>
															</tr>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/AnalyticsDashboard/components/charts/MetricsDisplay.jsx'>MetricsDisplay.jsx</a></b></td>
																<td>- Provides reusable components for displaying metrics in a visually appealing manner on the analytics dashboard<br>- Includes components for centered metrics, metrics grid, and metrics list, enhancing the presentation of key data points.</td>
															</tr>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/AnalyticsDashboard/components/charts/PieChartComponent.jsx'>PieChartComponent.jsx</a></b></td>
																<td>- Generates a responsive and visually appealing pie chart for analytics data visualization<br>- Renders customizable chart components with tooltips and legends, enhancing the user experience in the analytics dashboard section.</td>
															</tr>
															</table>
														</blockquote>
													</details>
												</blockquote>
											</details>
											<details>
												<summary><b>hooks</b></summary>
												<blockquote>
													<table>
													<tr>
														<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/AnalyticsDashboard/hooks/useAnalyticsData.js'>useAnalyticsData.js</a></b></td>
														<td>- Enables fetching and managing analytics data for a specified time range, updating loading and error states accordingly<br>- Transforms fetched data for display, ensuring accurate revenue representation<br>- Facilitates seamless integration with external loading state management.</td>
													</tr>
													<tr>
														<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/AnalyticsDashboard/hooks/useTimeRange.js'>useTimeRange.js</a></b></td>
														<td>- Manages the time range state for the Analytics Dashboard section, providing a way to track and update the selected time range value<br>- This custom hook enhances the user experience by allowing seamless control over the time period displayed in the dashboard.</td>
													</tr>
													</table>
												</blockquote>
											</details>
										</blockquote>
									</details>
									<details>
										<summary><b>FloorPlanDesigner</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/FloorPlanDesigner/FloorPlanDesigner.module.css'>FloorPlanDesigner.module.css</a></b></td>
												<td>- Define the styling for the Floor Plan Designer module, including layout, buttons, and canvas controls<br>- The CSS file sets the visual properties for elements like the container, edit button, and canvas resizing controls, enhancing the user interface of the dashboard section.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/FloorPlanDesigner/FloorPlanDesigner.jsx'>FloorPlanDesigner.jsx</a></b></td>
												<td>- Facilitates floor plan design with interactive elements, enabling users to add tables, walls, doors, and windows<br>- Manages drawing modes, table types, and modal interactions for seamless design experience<br>- Integrates custom hooks for state management and logic handling, enhancing user interaction and design flexibility within the floor plan designer component.</td>
											</tr>
											</table>
											<details>
												<summary><b>components</b></summary>
												<blockquote>
													<details>
														<summary><b>TableNumberModal</b></summary>
														<blockquote>
															<table>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/FloorPlanDesigner/components/TableNumberModal/TableNumberModal.module.css'>TableNumberModal.module.css</a></b></td>
																<td>- Define the visual styling for a modal component used in the Floor Plan Designer section<br>- The CSS rules specify the layout, animations, and design elements for the modal backdrop, header, body, and footer<br>- This file enhances the user experience by providing a consistent and appealing interface for interacting with table numbers within the application.</td>
															</tr>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/FloorPlanDesigner/components/TableNumberModal/TableNumberModal.jsx'>TableNumberModal.jsx</a></b></td>
																<td>- Enables users to add new tables with specified numbers through a modal interface<br>- Validates input, displays errors, and positions the modal based on user interaction<br>- Supports confirming or canceling table additions.</td>
															</tr>
															</table>
														</blockquote>
													</details>
													<details>
														<summary><b>Door</b></summary>
														<blockquote>
															<table>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/FloorPlanDesigner/components/Door/DoorComponent.jsx'>DoorComponent.jsx</a></b></td>
																<td>- Render a door element in the floor plan, allowing interaction with edit mode enabled<br>- Displays door details, supports dragging, resizing, and rotation based on provided data.</td>
															</tr>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/FloorPlanDesigner/components/Door/DoorComponent.module.css'>DoorComponent.module.css</a></b></td>
																<td>- Define styling for door components, including colors, stroke width, and text properties<br>- Implement animations for door appearance and resize handles<br>- The CSS file enhances the visual representation of the floor plan designer module within the project architecture.</td>
															</tr>
															</table>
														</blockquote>
													</details>
													<details>
														<summary><b>FloorPlanCanvas</b></summary>
														<blockquote>
															<table>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/FloorPlanDesigner/components/FloorPlanCanvas/FloorPlanCanvas.jsx'>FloorPlanCanvas.jsx</a></b></td>
																<td>- The FloorPlanCanvas component renders interactive floor plan elements based on user actions, such as adding tables, walls, doors, and windows<br>- It enables editing functionalities like drawing walls, dragging elements, and resizing components<br>- This component plays a crucial role in visualizing and manipulating floor plan layouts within the project architecture.</td>
															</tr>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/FloorPlanDesigner/components/FloorPlanCanvas/FloorPlanCanvas.module.css'>FloorPlanCanvas.module.css</a></b></td>
																<td>Enables styling for the Floor Plan Canvas component in the Dashboard section of the project.</td>
															</tr>
															</table>
														</blockquote>
													</details>
													<details>
														<summary><b>TablePreview</b></summary>
														<blockquote>
															<table>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/FloorPlanDesigner/components/TablePreview/TablePreview.module.css'>TablePreview.module.css</a></b></td>
																<td>- Defines styling for the Table Preview component in the Floor Plan Designer section<br>- The CSS rules specify layout properties like margin, border, padding, and alignment for the table preview container and its SVG element<br>- This file contributes to maintaining a consistent and visually appealing design for the dashboard module.</td>
															</tr>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/FloorPlanDesigner/components/TablePreview/TablePreview.jsx'>TablePreview.jsx</a></b></td>
																<td>Render a preview of the selected table type with scaling and positioning for optimal display in the FloorPlanDesigner module.</td>
															</tr>
															</table>
														</blockquote>
													</details>
													<details>
														<summary><b>Window</b></summary>
														<blockquote>
															<table>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/FloorPlanDesigner/components/Window/WindowComponent.jsx'>WindowComponent.jsx</a></b></td>
																<td>- Render a window element in the floor plan, allowing for interactive editing features like drag, resize, and details display<br>- The component dynamically adjusts window position, size, and rotation based on user input, enhancing the visual representation of the floor plan.</td>
															</tr>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/FloorPlanDesigner/components/Window/WindowComponent.module.css'>WindowComponent.module.css</a></b></td>
																<td>Define styling for window components, table IDs, and resize handles with animations for appearance and interaction in the FloorPlanDesigner module.</td>
															</tr>
															</table>
														</blockquote>
													</details>
													<details>
														<summary><b>Wall</b></summary>
														<blockquote>
															<table>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/FloorPlanDesigner/components/Wall/WallComponent.jsx'>WallComponent.jsx</a></b></td>
																<td>- Render a wall element in the floor plan, allowing interaction for editing, dragging, and resizing<br>- Displays wall details and handles edit mode functionality.</td>
															</tr>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/FloorPlanDesigner/components/Wall/WallComponent.module.css'>WallComponent.module.css</a></b></td>
																<td>- Define styling for walls, table IDs, and resize handles in the FloorPlanDesigner component<br>- Includes animations for wall drawing and resize handle hover effects.</td>
															</tr>
															</table>
														</blockquote>
													</details>
													<details>
														<summary><b>ElementDetails</b></summary>
														<blockquote>
															<table>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/FloorPlanDesigner/components/ElementDetails/ElementDetails.module.css'>ElementDetails.module.css</a></b></td>
																<td>- Define the styling for the element details section in the FloorPlanDesigner module<br>- It specifies the layout, animations, and design elements for displaying information about selected elements<br>- The styles enhance user experience by providing a visually appealing and functional interface for interacting with elements in the floor plan.</td>
															</tr>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/FloorPlanDesigner/components/ElementDetails/ElementDetails.jsx'>ElementDetails.jsx</a></b></td>
																<td>- Displays and manages details of a selected element, allowing rotation, deletion, and activation/deactivation<br>- Ensures the panel remains within viewport bounds for optimal user experience.</td>
															</tr>
															</table>
														</blockquote>
													</details>
													<details>
														<summary><b>Table</b></summary>
														<blockquote>
															<table>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/FloorPlanDesigner/components/Table/TableComponent.jsx'>TableComponent.jsx</a></b></td>
																<td>- TableComponent renders interactive table elements in the floor plan, handling animations for creation, deletion, activation, and deactivation<br>- It responds to user interactions, enabling editing functionalities and displaying details<br>- The component enhances the user experience by providing visual feedback and interactivity within the floor plan designer module.</td>
															</tr>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/FloorPlanDesigner/components/Table/TableComponent.module.css'>TableComponent.module.css</a></b></td>
																<td>Define CSS styles for table animations and transitions in the FloorPlanDesigner module to enhance user experience and visual appeal.</td>
															</tr>
															</table>
														</blockquote>
													</details>
													<details>
														<summary><b>ControlPanel</b></summary>
														<blockquote>
															<table>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/FloorPlanDesigner/components/ControlPanel/ControlPanel.module.css'>ControlPanel.module.css</a></b></td>
																<td>- Define the styling for the control panel component in the dashboard section<br>- The CSS rules specify the layout, colors, and behavior of the control panel elements, enhancing the user interface of the floor plan designer module.</td>
															</tr>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/FloorPlanDesigner/components/ControlPanel/ControlPanel.jsx'>ControlPanel.jsx</a></b></td>
																<td>ControlPanel component manages drawing modes and table type selection in the FloorPlanDesigner section, enhancing user interaction and customization within the architecture.</td>
															</tr>
															</table>
														</blockquote>
													</details>
												</blockquote>
											</details>
											<details>
												<summary><b>hooks</b></summary>
												<blockquote>
													<table>
													<tr>
														<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/FloorPlanDesigner/hooks/useFloorPlanData.js'>useFloorPlanData.js</a></b></td>
														<td>- Manages floor plan data by fetching and organizing tables, walls, doors, and windows from respective services<br>- Utilizes React hooks to handle data loading and state management efficiently<br>- Improves architectural clarity and data flow within the project's dashboard section.</td>
													</tr>
													<tr>
														<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/FloorPlanDesigner/hooks/useCanvasUtils.js'>useCanvasUtils.js</a></b></td>
														<td>Manages canvas utilities for the floor plan designer, including handling cursor position relative to the SVG element and clicks on the background to control the panel state.</td>
													</tr>
													<tr>
														<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/FloorPlanDesigner/hooks/useElementHandlers.js'>useElementHandlers.js</a></b></td>
														<td>- The `useElementHandlers.js` file in the `FloorPlanDesigner` section of the codebase provides a custom hook for managing element interactions within the floor plan designer module<br>- It handles the manipulation of tables, walls, doors, and windows by providing functions to add, move, and delete these elements<br>- This hook encapsulates the logic for handling user interactions and updating the state of these elements in the floor plan designer, contributing to the overall functionality of the architectural design tool.</td>
													</tr>
													</table>
												</blockquote>
											</details>
										</blockquote>
									</details>
									<details>
										<summary><b>MenuManagement</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/MenuManagement/MenuManagement.jsx'>MenuManagement.jsx</a></b></td>
												<td>- Manages menu items, allowing filtering by type and search term<br>- Displays search input, filter by type, and menu items grid<br>- Handles loading states and dialog for creating/updating items<br>- Fetches menu options and updates UI accordingly<br>- Provides essential functions for managing menu items efficiently within the dashboard section.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/MenuManagement/MenuManagement.module.css'>MenuManagement.module.css</a></b></td>
												<td>- Define styling for menu management section, including search filters, input fields, and grid layout<br>- Adjust layout for responsiveness on smaller screens<br>- Display an empty state message when no data is available.</td>
											</tr>
											</table>
											<details>
												<summary><b>components</b></summary>
												<blockquote>
													<details>
														<summary><b>MenuItemDialog</b></summary>
														<blockquote>
															<table>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/MenuManagement/components/MenuItemDialog/MenuItemDialog.jsx'>MenuItemDialog.jsx</a></b></td>
																<td>- The MenuItemDialog component facilitates the creation and editing of menu items within the dashboard section<br>- It allows users to input and modify details such as name, price, type, image, and allergens<br>- The component ensures data validation and provides a user-friendly interface for managing menu items effectively.</td>
															</tr>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/MenuManagement/components/MenuItemDialog/MenuItemDialog.module.css'>MenuItemDialog.module.css</a></b></td>
																<td>- Define the visual styling for the menu item dialog overlay and form in the dashboard section of the project<br>- The CSS rules in this file control the layout, positioning, and appearance of the dialog elements, ensuring a consistent and user-friendly interface for managing menu items.</td>
															</tr>
															</table>
														</blockquote>
													</details>
													<details>
														<summary><b>MenuItemCard</b></summary>
														<blockquote>
															<table>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/MenuManagement/components/MenuItemCard/MenuItemCard.jsx'>MenuItemCard.jsx</a></b></td>
																<td>- Displays a menu item in a card format with options to edit or delete<br>- Formats price, displays image, type badge, name, price, calories, wait time, allergens, and actions.</td>
															</tr>
															<tr>
																<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/MenuManagement/components/MenuItemCard/MenuItemCard.module.css'>MenuItemCard.module.css</a></b></td>
																<td>- Define the visual styling for menu item cards in the dashboard section<br>- The CSS file sets the layout, colors, and transitions for each menu item card, including image display, content alignment, and action buttons<br>- It enhances the user interface by providing a clean and interactive design for managing menu items.</td>
															</tr>
															</table>
														</blockquote>
													</details>
												</blockquote>
											</details>
										</blockquote>
									</details>
									<details>
										<summary><b>OpeningHours</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/OpeningHours/OpeningHours.jsx'>OpeningHours.jsx</a></b></td>
												<td>- The OpeningHours component in the provided code file displays and enables editing of opening hours for each day of the week<br>- It allows users to toggle open/closed status, set opening and closing times, and save changes<br>- This component plays a crucial role in managing and presenting business operating hours within the dashboard section of the project.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/sections/OpeningHours/OpeningHours.module.css'>OpeningHours.module.css</a></b></td>
												<td>- Define the styling for the opening hours section in the dashboard, including layout, fonts, colors, and interactive elements<br>- This CSS module ensures a visually appealing and user-friendly display of business hours, with features like status indicators, toggle switches, time inputs, and a save button.</td>
											</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<details>
								<summary><b>components</b></summary>
								<blockquote>
									<details>
										<summary><b>DataFetchingState</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/components/DataFetchingState/DataFetchingState.jsx'>DataFetchingState.jsx</a></b></td>
												<td>- The DataFetchingState component manages different states during data fetching, displaying loading, error, or empty states based on provided flags<br>- It handles rendering loading indicators, error messages with retry functionality, and empty state messages<br>- This component plays a crucial role in enhancing user experience by providing clear feedback during data retrieval processes.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/components/DataFetchingState/DataFetchingState.module.css'>DataFetchingState.module.css</a></b></td>
												<td>Define styling for data fetching state components in the dashboard, including layout, colors, and button styles.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>Header</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/components/Header/Header.jsx'>Header.jsx</a></b></td>
												<td>- Generates the Header component for the dashboard, displaying icons and titles based on the active tab<br>- It also provides controls for actions like editing hours, approving reservations, managing tables, adding employees, filtering reservations, and adding menu items<br>- The component dynamically adjusts its content and functionality according to the selected tab.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/components/Header/Header.module.css'>Header.module.css</a></b></td>
												<td>- Define the styling for the dashboard header, including layout, typography, buttons, toggles, and badges<br>- Ensure a clean and consistent visual representation across the dashboard interface.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>Sidebar</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/components/Sidebar/Sidebar.module.css'>Sidebar.module.css</a></b></td>
												<td>- Defines the styling for the dashboard sidebar, including layout, transitions, and responsiveness<br>- Manages the appearance and behavior of sidebar elements such as navigation sections, buttons, user profile, and collapse functionality<br>- Controls the sidebar's visibility and interaction based on screen size and user actions.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/components/Sidebar/Sidebar.jsx'>Sidebar.jsx</a></b></td>
												<td>- Implements a dynamic Sidebar component for the dashboard, facilitating navigation and management functionalities<br>- Handles collapsible sections, responsive behavior based on screen size, and user-specific content visibility<br>- Enables toggling sidebar state and section collapse, enhancing user experience and interaction within the dashboard interface.</td>
											</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<details>
								<summary><b>hooks</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/hooks/useMenuManagement.js'>useMenuManagement.js</a></b></td>
										<td>- Manages menu items by providing functions to create, update, and delete items<br>- Handles dialog visibility, editing state, and loading status<br>- Implements error handling for each operation<br>- Supports managing menu items efficiently within the dashboard module.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/hooks/useActiveTab.js'>useActiveTab.js</a></b></td>
										<td>- Manages active tabs and fetches relevant data for reservations, opening hours, tables, employees, menu items, and orders based on the selected tab<br>- Handles tab changes and updates the URL hash accordingly<br>- Controls loading state during data fetching operations.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/hooks/useWebSocket.js'>useWebSocket.js</a></b></td>
										<td>- Manage WebSocket connections and handle incoming messages based on the active tab in the dashboard<br>- Update pending reservations with real-time data, ensuring seamless communication with the server<br>- This custom hook enhances user experience by dynamically updating reservation information without manual refreshes.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/hooks/useEmployeeManagement.js'>useEmployeeManagement.js</a></b></td>
										<td>- Manages employee operations such as adding, removing, and updating roles<br>- Handles employee creation with delays based on roles<br>- Provides functions to interact with employee data and toggle the add employee dialog.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/hooks/useRestaurantConfig.js'>useRestaurantConfig.js</a></b></td>
										<td>- Manages restaurant configuration state, including contact info, address, map settings, and features<br>- Handles data fetching, validation, and saving operations<br>- Provides functions to update settings, toggle features, and show notifications<br>- Supports loading state management and error handling.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/hooks/useTablesManagement.js'>useTablesManagement.js</a></b></td>
										<td>- Manages table functionality by providing state and functions for editing tables<br>- Includes methods to retrieve table names and toggle edit mode.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/hooks/useReservationManagement.js'>useReservationManagement.js</a></b></td>
										<td>- Manages reservation actions by approving or rejecting pending reservations, updating states, and interacting with the reservation service<br>- Handles individual and bulk approval, as well as rejection, while maintaining loading states<br>- This hook encapsulates reservation management logic for efficient handling within the dashboard module.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/hooks/useUIState.js'>useUIState.js</a></b></td>
										<td>- Manages UI state by providing functions to toggle reservation filter mode and handle sidebar collapse<br>- The code file enhances user experience by controlling UI elements like reservation filters and sidebar visibility.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/hooks/useHoursManagement.js'>useHoursManagement.js</a></b></td>
										<td>- Manages opening hours by allowing users to edit, toggle day status, enter edit mode, and save changes to the server<br>- The code file facilitates dynamic handling of opening hours data within the dashboard module, enhancing user interaction and data management capabilities.</td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>pages</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/pages/Dashboard.module.css'>Dashboard.module.css</a></b></td>
										<td>- Define the layout and styling for the dashboard page, including responsive behavior and component design<br>- The CSS file sets margins, widths, heights, and styles for various dashboard elements like headers, content, cards, and buttons<br>- It ensures a cohesive and visually appealing user interface for the dashboard module.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/dashboard/pages/Dashboard.jsx'>Dashboard.jsx</a></b></td>
										<td>- Manages the main dashboard for a restaurant, overseeing reservations, opening hours, employee and menu management<br>- Utilizes various hooks for state and UI management, including WebSocket connection for real-time updates<br>- Dynamically renders different sections based on the active tab, enhancing restaurant operations and efficiency.</td>
									</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<details>
						<summary><b>menu</b></summary>
						<blockquote>
							<details>
								<summary><b>components</b></summary>
								<blockquote>
									<details>
										<summary><b>ItemDetailsModal</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/menu/components/ItemDetailsModal/ItemDetailsModal.jsx'>ItemDetailsModal.jsx</a></b></td>
												<td>- Displays detailed information about a selected item, including image, name, category, price, description, preparation time, calories, and allergens<br>- Enables adding or removing the item from the cart, with options to adjust quantity<br>- Supports closing the modal and adding the item to the cart.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/menu/components/ItemDetailsModal/ItemDetailsModal.module.css'>ItemDetailsModal.module.css</a></b></td>
												<td>- Define the visual styling for the item details modal, including overlay, modal layout, close button, content structure, image display, specifications, and action buttons<br>- Implement animations for modal appearance and user interactions<br>- Ensure responsive design for various screen sizes.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>MenuItem</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/menu/components/MenuItem/MenuItem.module.css'>MenuItem.module.css</a></b></td>
												<td>- Define the styling for menu items, including layout, transitions, and responsiveness<br>- The CSS in this file controls the visual presentation of menu items, ensuring a consistent and appealing design across various screen sizes.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/menu/components/MenuItem/MenuItem.jsx'>MenuItem.jsx</a></b></td>
												<td>- The MenuItem component renders a menu item with details like image, name, category, preparation time, and calories<br>- It enables adding items to the cart and opening item details<br>- This component enhances the user experience by providing a seamless way to interact with menu items and manage orders efficiently within the application.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>MobileCart</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/menu/components/MobileCart/MobileCart.module.css'>MobileCart.module.css</a></b></td>
												<td>- Define the mobile cart styling for a seamless user experience<br>- Positioning, colors, animations, and layout are tailored to enhance the cart's visibility and functionality<br>- The design ensures a cohesive and engaging shopping journey within the project's architecture.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/menu/components/MobileCart/MobileCart.jsx'>MobileCart.jsx</a></b></td>
												<td>- The MobileCart component renders a mobile-friendly shopping cart sidebar, displaying items, total price, and a checkout button<br>- It manages cart visibility toggling and closure on outside clicks<br>- It also prevents body scrolling when the cart is open.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>MenuItemsList</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/menu/components/MenuItemsList/MenuItemsList.module.css'>MenuItemsList.module.css</a></b></td>
												<td>- Define responsive grid layout for menu items with varying column sizes based on screen width<br>- Includes styling for empty message display.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/menu/components/MenuItemsList/MenuItemsList.jsx'>MenuItemsList.jsx</a></b></td>
												<td>- Render a list of menu items, displaying a message if none are found<br>- Allows users to adjust search or filters.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>CartSidebar</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/menu/components/CartSidebar/CartSidebar.jsx'>CartSidebar.jsx</a></b></td>
												<td>- The CartSidebar component renders the shopping cart sidebar, displaying items, total price, and a checkout button<br>- It interacts with the cart, adding/removing items, calculating totals, and navigating to checkout<br>- This component enhances the user experience by providing a clear overview of the shopping cart contents and facilitating seamless checkout flow.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/menu/components/CartSidebar/CartSidebar.module.css'>CartSidebar.module.css</a></b></td>
												<td>- Define the styling for the cart sidebar component, ensuring a visually appealing and user-friendly checkout experience<br>- The CSS rules in this file control the layout, colors, and animations of the cart sidebar, enhancing the overall shopping process for users.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>AllergenTags</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/menu/components/AllergenTags/AllergenTags.jsx'>AllergenTags.jsx</a></b></td>
												<td>- The AllergenTags component renders a list of allergen tags that can be removed by clicking on them<br>- It takes in a list of excluded allergens and a function to toggle the exclusion of an allergen<br>- This component enhances user experience by allowing easy management of allergen filters within the application.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/menu/components/AllergenTags/AllergenTags.module.css'>AllergenTags.module.css</a></b></td>
												<td>- Define the styling for allergen tags display in the menu component, ensuring a clean and user-friendly interface<br>- The CSS rules handle layout, responsiveness, and interactive hover effects for allergen tags and their associated icons.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>AllergenFilter</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/menu/components/AllergenFilter/AllergenFilter.jsx'>AllergenFilter.jsx</a></b></td>
												<td>- The AllergenFilter component renders a filter panel to exclude dishes with selected allergens<br>- It allows users to toggle allergen filters, select allergens to exclude, clear filters, and apply changes<br>- The component enhances the user experience by providing a customizable way to filter menu items based on allergens.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/menu/components/AllergenFilter/AllergenFilter.module.css'>AllergenFilter.module.css</a></b></td>
												<td>- Define the styling for the allergen filter overlay and panel, creating a visually appealing and user-friendly interface for filtering allergens in the application<br>- The CSS rules ensure a smooth animation and responsive layout, enhancing the overall user experience.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>CartItem</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/menu/components/CartItem/CartItem.jsx'>CartItem.jsx</a></b></td>
												<td>- The CartItem component renders a cart item with its name, quantity, and total price<br>- It enables users to increase or decrease the item quantity and interacts with functions to add or remove items from the cart<br>- This component plays a crucial role in displaying and managing individual items within the shopping cart interface.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/menu/components/CartItem/CartItem.module.css'>CartItem.module.css</a></b></td>
												<td>Define the visual styling for cart items in the menu component, enhancing user experience by providing a structured and appealing layout.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>CategoryFilter</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/menu/components/CategoryFilter/CategoryFilter.jsx'>CategoryFilter.jsx</a></b></td>
												<td>- Enables rendering and selection of category buttons in the menu interface<br>- Displays a list of categories for selection, highlighting the active category<br>- Allows users to switch between categories seamlessly.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/menu/components/CategoryFilter/CategoryFilter.module.css'>CategoryFilter.module.css</a></b></td>
												<td>Define styling for category filter component to display and interact with filter buttons.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>SearchBar</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/menu/components/SearchBar/SearchBar.jsx'>SearchBar.jsx</a></b></td>
												<td>- Implements a SearchBar component for searching food, categories, or allergens<br>- Includes functionality to set search terms, clear search, and toggle allergen filters<br>- Displays the search input field, clear button, and filter toggle button with allergen count badge.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/menu/components/SearchBar/SearchBar.module.css'>SearchBar.module.css</a></b></td>
												<td>- Defines styles for a sticky search bar with search input, icon, and clear button<br>- Includes responsive design for mobile view.</td>
											</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<details>
								<summary><b>hooks</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/menu/hooks/useViewport.js'>useViewport.js</a></b></td>
										<td>Enables dynamic responsiveness by detecting viewport size changes, aiding in adaptive UI rendering.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/menu/hooks/useMenuState.js'>useMenuState.js</a></b></td>
										<td>- Manages menu state, filtering, and item details for the project<br>- Fetches menu items, applies filters, handles modal interactions, and controls scrolling behavior<br>- Provides functions for search, cart management, allergen handling, and mobile view<br>- Maintains loading and error states.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/menu/hooks/useAllergens.js'>useAllergens.js</a></b></td>
										<td>- Manages allergen filtering functionality by providing methods to toggle allergens, clear filters, and format allergen names<br>- Controls the visibility of the allergen filter panel within the project's menu module architecture.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/menu/hooks/useCart.js'>useCart.js</a></b></td>
										<td>- Manages shopping cart functionality by handling cart items, total prices, and mobile cart visibility<br>- Allows adding/removing items, calculating totals, and toggling mobile cart view<br>- Facilitates seamless navigation to the checkout page.</td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>pages</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/menu/pages/Menu.js'>Menu.js</a></b></td>
										<td>- The Menu component renders the main menu page with search, filtering, and cart functionalities<br>- It displays menu items, item details, and manages mobile and desktop cart views, enhancing the overall user experience of the application.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/menu/pages/Menu.module.css'>Menu.module.css</a></b></td>
										<td>- Define styling for menu pages, layout, sections, loading, and error states<br>- Ensure consistent design across different screen sizes for a visually appealing user experience.</td>
									</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
					<details>
						<summary><b>home</b></summary>
						<blockquote>
							<details>
								<summary><b>sections</b></summary>
								<blockquote>
									<details>
										<summary><b>AboutUs</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/home/sections/AboutUs/AboutUsSection.module.css'>AboutUsSection.module.css</a></b></td>
												<td>- Define the styling for the About Us section, ensuring a responsive layout for different screen sizes<br>- The code sets the structure, alignment, and visual effects for the section, enhancing user experience and readability.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/home/sections/AboutUs/AboutUsSection.jsx'>AboutUsSection.jsx</a></b></td>
												<td>- Render the "About Us" section of the home page, showcasing the restaurant's description and image gallery<br>- Emphasizing the restaurant's mission and dedication to crafting memorable dining experiences through carefully curated dishes and welcoming ambiance<br>- The component integrates with the useAboutImages hook to display a gallery of images that complement the narrative.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>Hero</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/home/sections/Hero/HeroSection.jsx'>HeroSection.jsx</a></b></td>
												<td>- The HeroSection component renders the hero section of the home page, showcasing an image slider and a reservation call-to-action button<br>- It enhances the user experience by providing a visually appealing introduction to the website and encouraging users to make reservations easily.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/home/sections/Hero/HeroSection.module.css'>HeroSection.module.css</a></b></td>
												<td>- Define the styling for the Hero section of the home module, ensuring a responsive and visually appealing layout<br>- The code in this file sets the structure, design, and behavior of the main content container, image container, content elements, and buttons, enhancing the user experience on various screen sizes.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>OpeningHours</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/home/sections/OpeningHours/OpeningHoursSection.jsx'>OpeningHoursSection.jsx</a></b></td>
												<td>- Displays the "Opening Hours" section on the home page, showcasing opening hours, contact phone number, and restaurant images<br>- Utilizes hooks for fetching data and context for authentication<br>- Renders formatted opening hours and phone number, handling loading and error states gracefully.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/home/sections/OpeningHours/OpeningHoursSection.module.css'>OpeningHoursSection.module.css</a></b></td>
												<td>- Define the styling for the opening hours section of the home module, ensuring a responsive and visually appealing layout<br>- The code in the provided file sets the structure, alignment, and design elements for displaying business hours and contact information on the website.</td>
											</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<details>
								<summary><b>components</b></summary>
								<blockquote>
									<details>
										<summary><b>ImageSlider</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/home/components/ImageSlider/ImageSlider.module.css'>ImageSlider.module.css</a></b></td>
												<td>- Define styles for an image slider component with navigation buttons and indicators<br>- Set responsive design for varying screen sizes.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/home/components/ImageSlider/ImageSlider.jsx'>ImageSlider.jsx</a></b></td>
												<td>- Implements an ImageSlider component for displaying images with navigation controls<br>- Uses React and custom hooks for functionality<br>- Key features include transitioning effects, slide indicators, and navigation buttons for previous and next slides<br>- Designed to enhance user experience by providing a visually engaging way to view a collection of images.</td>
											</tr>
											</table>
										</blockquote>
									</details>
									<details>
										<summary><b>HomeFooter</b></summary>
										<blockquote>
											<table>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/home/components/HomeFooter/HomeFooter.jsx'>HomeFooter.jsx</a></b></td>
												<td>- Generates the HomeFooter component displaying contact info, quick links, and social icons on the home page footer<br>- Integrates with AuthContext for config data and uses the current year for copyright<br>- Designed to enhance user engagement and provide essential information in a visually appealing manner.</td>
											</tr>
											<tr>
												<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/home/components/HomeFooter/HomeFooter.module.css'>HomeFooter.module.css</a></b></td>
												<td>Define color variables and styles for the footer section, ensuring a cohesive and visually appealing design across the project.</td>
											</tr>
											</table>
										</blockquote>
									</details>
								</blockquote>
							</details>
							<details>
								<summary><b>hooks</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/home/hooks/useRestaurantImages.js'>useRestaurantImages.js</a></b></td>
										<td>- Manages restaurant ambiance images by providing URLs for display<br>- The code file `useRestaurantImages.js` in the `home` module creates a custom hook to handle restaurant image data efficiently<br>- It encapsulates image URLs and enhances performance by utilizing memoization.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/home/hooks/useHomeImages.js'>useHomeImages.js</a></b></td>
										<td>- Manages food images for the home hero section by providing a custom hook that returns an object containing URLs for five food images<br>- The hook utilizes useMemo to optimize performance by memoizing the images array.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/home/hooks/useAboutImages.js'>useAboutImages.js</a></b></td>
										<td>- Manage image URLs for the About Us section in the project by utilizing a custom hook<br>- The hook, useAboutImages, efficiently handles and provides the necessary image URLs for the About section, enhancing the user experience and visual appeal of the application.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/home/hooks/useOpeningHours.js'>useOpeningHours.js</a></b></td>
										<td>Fetches and manages restaurant opening hours, providing state and loading/error info.</td>
									</tr>
									</table>
								</blockquote>
							</details>
							<details>
								<summary><b>pages</b></summary>
								<blockquote>
									<table>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/home/pages/Home.module.css'>Home.module.css</a></b></td>
										<td>Define styling rules for the home page layout, ensuring responsiveness across various screen sizes.</td>
									</tr>
									<tr>
										<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/modules/home/pages/Home.jsx'>Home.jsx</a></b></td>
										<td>Renders the home page layout with hero, opening hours, about us sections, and footer components.</td>
									</tr>
									</table>
								</blockquote>
							</details>
						</blockquote>
					</details>
				</blockquote>
			</details>
			<details>
				<summary><b>styles</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/styles/CommonStyles.module.css'>CommonStyles.module.css</a></b></td>
						<td>- Define consistent styling for section containers in the project, ensuring a uniform and visually appealing layout<br>- The code in CommonStyles.module.css establishes the structure, alignment, and responsiveness of section containers, enhancing the overall user experience.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/styles/variables.module.css'>variables.module.css</a></b></td>
						<td>Define global styling variables for consistent theming and design across the project.</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>config</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/config/FirebaseConfig.js'>FirebaseConfig.js</a></b></td>
						<td>- Initialize Firebase configuration and set up authentication, analytics, and performance monitoring using Firebase services<br>- Import necessary Firebase modules and configure API keys for authentication and analytics<br>- Export authentication providers, analytics, and performance instances for use throughout the codebase architecture.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/config/apiConfig.js'>apiConfig.js</a></b></td>
						<td>- Manages API requests by setting base URL and handling authentication tokens<br>- Intercepts requests to include authorization headers and refreshes tokens on 401 errors<br>- Facilitates seamless communication with the backend API.</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>constants</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/constants/routes.js'>routes.js</a></b></td>
						<td>Define application routes for navigation and authentication in the project.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/constants/cookieKeys.js'>cookieKeys.js</a></b></td>
						<td>Defines cookie keys used for user authentication and configuration storage in the project.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/constants/tableTypes.js'>tableTypes.js</a></b></td>
						<td>- Define various types of tables with specific dimensions and chair configurations<br>- Ensure backward compatibility for old table references within the codebase architecture.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/constants/drawingModes.js'>drawingModes.js</a></b></td>
						<td>Defines drawing modes for various architectural elements in the project.</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>routing</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/routing/AppRoutes.js'>AppRoutes.js</a></b></td>
						<td>- Defines main application routes using React Router, including home, checkout, profile, authentication, admin, and not found routes<br>- Utilizes components for layout, navigation, and specific page content<br>- Implements protected routes for admin access based on roles<br>- Overall, orchestrates navigation flow within the application based on defined route constants.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/routing/ProtectedRoute.js'>ProtectedRoute.js</a></b></td>
						<td>- Ensures route protection based on user roles by redirecting unauthorized users to the home page<br>- The ProtectedRoute component validates user authentication and role permissions before rendering the route content<br>- This component plays a crucial role in maintaining secure access control within the project's routing architecture.</td>
					</tr>
					</table>
				</blockquote>
			</details>
			<details>
				<summary><b>services</b></summary>
				<blockquote>
					<table>
					<tr>
						<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/services/restaurantConfig.service.js'>restaurantConfig.service.js</a></b></td>
						<td>- Manages restaurant configuration data, including phone numbers, emails, addresses, maps, and features<br>- Enables retrieval, addition, updating, and deletion of these details through API calls<br>- Facilitates seamless management of essential restaurant information within the system.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/services/analytics.service.js'>analytics.service.js</a></b></td>
						<td>- Provides various analytics data fetching methods using Axios to interact with the API<br>- The service retrieves dashboard summaries, revenue, menu item, reservation, order, and operational analytics<br>- It also offers a method to fetch all analytics data in a single call, allowing for efficient data retrieval for different aspects of the application.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/services/window.service.js'>window.service.js</a></b></td>
						<td>- Manages window data CRUD operations through API requests, enabling window creation, retrieval, updating, and deletion<br>- Facilitates seamless interaction with the backend server for handling window-related tasks within the project architecture.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/services/user.service.js'>user.service.js</a></b></td>
						<td>- Handles user-related operations like retrieving user details, fetching all users, getting privileged users, and changing user privileges<br>- Utilizes Axios for API calls and manages user privileges in cookies<br>- This service file encapsulates user management functionality, promoting a modular and organized codebase architecture.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/services/table.service.js'>table.service.js</a></b></td>
						<td>- Manages table data by creating, retrieving, updating, deleting, activating, and deactivating tables through API calls<br>- Handles table properties like seats, position, type, and status<br>- Facilitates seamless interaction with the backend for table management operations within the project architecture.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/services/reservation.service.js'>reservation.service.js</a></b></td>
						<td>- Manages reservation operations such as creation, cancellation, confirmation, completion, rescheduling, retrieval, and listing<br>- Handles tasks like finding free tables, fetching all reservations, filtering by status, and accessing user-specific reservations<br>- Integrates with the backend API to facilitate seamless reservation management within the system.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/services/walls.service.js'>walls.service.js</a></b></td>
						<td>- Manages wall data operations such as creation, retrieval, update, and deletion<br>- Utilizes axios for API interactions<br>- Facilitates seamless handling of wall-related tasks within the project's service layer.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/services/door.service.js'>door.service.js</a></b></td>
						<td>- Manages CRUD operations for doors in the project, including creation, retrieval, updating, and deletion<br>- Utilizes axios to interact with the API endpoints for handling door data<br>- The service encapsulates the logic for door management, abstracting away the API communication details.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/services/order.service.js'>order.service.js</a></b></td>
						<td>- Handles order-related API operations such as fetching, updating, canceling, and creating orders for users and employees<br>- The service interacts with the backend API to retrieve order details, update order status, and manage order processing efficiently within the application.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/services/auth.service.js'>auth.service.js</a></b></td>
						<td>- Handles user authentication, registration, logout, token refresh, employee and owner creation/deletion, Google login, password reset, and account deletion<br>- Manages user tokens securely using cookies and interacts with the backend API for user-related operations.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/services/menuItem.service.js'>menuItem.service.js</a></b></td>
						<td>- Handles menu item operations such as fetching, creating, updating, and deleting menu items<br>- Utilizes Axios to interact with the API endpoints for menu items<br>- Provides functions to retrieve all menu items, get specific menu items by ID, fetch menu item types and allergen options, create new menu items, update existing menu items, and delete menu items.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/services/openingHours.service.js'>openingHours.service.js</a></b></td>
						<td>- Manages CRUD operations for opening hours data, facilitating retrieval, addition, updating, and deletion of opening hours entries<br>- Utilizes Axios to interact with the API, enabling seamless handling of opening hours information within the project's service layer.</td>
					</tr>
					<tr>
						<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/src/services/floorPlan.service.js'>floorPlan.service.js</a></b></td>
						<td>Retrieves floor plan data by making a request to the server using axios.</td>
					</tr>
					</table>
				</blockquote>
			</details>
		</blockquote>
	</details>
	<details> <!-- public Submodule -->
		<summary><b>public</b></summary>
		<blockquote>
			<table>
			<tr>
				<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/public/index.html'>index.html</a></b></td>
				<td>Defines the structure and content of the project's main HTML file, setting up essential metadata, links, and fonts for the web application.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/public/manifest.json'>manifest.json</a></b></td>
				<td>- Defines the manifest.json file in the public directory, specifying essential details for the React web application, such as the app's name, icons, start URL, display mode, theme color, and background color<br>- This file plays a crucial role in configuring the app's appearance and behavior when added to the project structure.</td>
			</tr>
			<tr>
				<td><b><a href='https://github.com/Unemployed-CS-Majors/RMS/blob/master/public/robots.txt'>robots.txt</a></b></td>
				<td>- Define crawling permissions for search engines by configuring the robots.txt file in the public directory<br>- This file specifies rules for web crawlers, allowing or disallowing access to specific parts of the website.</td>
			</tr>
			</table>
		</blockquote>
	</details>
</details>

---
##  Getting Started

###  Prerequisites

Before getting started with RMS, ensure your runtime environment meets the following requirements:

- **Programming Language:** CSS
- **Package Manager:** Npm


###  Installation

Install RMS using one of the following methods:

**Build from source:**

1. Clone the RMS repository:
```sh
❯ git clone https://github.com/Unemployed-CS-Majors/RMS
```

2. Navigate to the project directory:
```sh
❯ cd RMS
```

3. Install the project dependencies:


**Using `npm`** &nbsp; [<img align="center" src="" />]()

```sh
npm install
```

###  Usage
Run RMS using the following command:
**Using `npm`** &nbsp; [<img align="center" src="" />]()

```sh
npm start
```

---

##  Contributing

- **💬 [Join the Discussions](https://github.com/Unemployed-CS-Majors/RMS/discussions)**: Share your insights, provide feedback, or ask questions.
- **🐛 [Report Issues](https://github.com/Unemployed-CS-Majors/RMS/issues)**: Submit bugs found or log feature requests for the `RMS` project.
- **💡 [Submit Pull Requests](https://github.com/Unemployed-CS-Majors/RMS/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/Unemployed-CS-Majors/RMS
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/Unemployed-CS-Majors/RMS/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=Unemployed-CS-Majors/RMS">
   </a>
</p>
</details>

---

##  License

This project is protected under the [SELECT-A-LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

##  Acknowledgments

- List any resources, contributors, inspiration, etc. here.

---