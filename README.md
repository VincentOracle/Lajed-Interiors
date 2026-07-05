# LAJED INTERIORS - Premium Interior Design Website

![LAJED INTERIORS](https://img.shields.io/badge/LAJED-INTERIORS-gold?style=for-the-badge&logo=interior-design)

A premium, modern, and fully responsive website for LAJED INTERIORS, a luxury interior design studio based in Nairobi, Kenya. The website showcases the brand's portfolio, services, and expertise in residential, commercial, and hospitality interior design.

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Project Structure](#-project-structure)
- [Installation & Setup](#-installation--setup)
- [Pages Overview](#-pages-overview)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)
- [Acknowledgments](#-acknowledgments)
- [Project Status](#-project-status)

## 🎯 Overview

LAJED INTERIORS is a premium interior design brand that transforms spaces through thoughtful design and expert execution. This website serves as the digital storefront, showcasing the company's portfolio, services, and brand identity.

**Tagline:** DESIGN. CREATE. INSPIRE.

**Color Palette:** Luxury Gold (#C9A14A), Deep Charcoal (#0F0F0F), White (#FFFFFF)

## ✨ Features

### Frontend Features
- **Fully Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- **Sticky Navigation** - Transparent navbar that becomes solid on scroll
- **Hero Carousel** - Auto-rotating hero section with smooth transitions
- **Wavy Carousel** - Interactive horizontal scrolling gallery with wave animations
- **Scroll Animations** - Fade, slide, and zoom effects triggered by scrolling
- **Before/After Slider** - Interactive comparison tool for transformation projects
- **Video Gallery** - Embedded video cards with custom play overlay
- **Blog System** - Posts with likes, views, comments, categories, and hashtags
- **Contact Form** - Validated form that redirects to WhatsApp
- **Floating Contact Dock** - Minimizable WhatsApp, Call, and Email buttons
- **Lightbox Gallery** - Image and video lightbox viewer

### Backend Features
- **Flask Framework** - Python-based web application
- **PostgreSQL Database** - Robust relational database management
- **Cloudinary Integration** - Cloud-based image and video management
- **Admin Dashboard** - Content management system for blog posts and projects
- **Newsletter Subscription** - Email capture and management
- **Contact Form Handling** - Automated email notifications and WhatsApp redirection
- **Analytics Integration** - Page view tracking and user engagement metrics

## 🛠️ Technologies Used

### Frontend
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![jQuery](https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white)

### Backend
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

### Tools & Libraries
![Font Awesome](https://img.shields.io/badge/Font_Awesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white)
![Google Fonts](https://img.shields.io/badge/Google_Fonts-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Owl Carousel](https://img.shields.io/badge/Owl_Carousel-FF6B6B?style=for-the-badge&logo=javascript&logoColor=white)
![Lightbox](https://img.shields.io/badge/Lightbox-FFA500?style=for-the-badge&logo=javascript&logoColor=white)

### Deployment
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)
![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white)

### Design & Typography
- **Headings:** Cormorant Garamond (Serif)
- **Body:** Poppins (Sans-serif)
- **Labels:** Oswald (Sans-serif)

## 📁 Project Structure

```
lajed-interiors/
├── index.html                 # Homepage
├── about.html                 # About Us page
├── services.html              # Services overview
├── services-epoxy.html        # Epoxy Flooring service
├── services-kitchens.html     # Modern Kitchens service
├── services-wardrobes.html    # Wardrobes & Closets service
├── services-gypsum.html       # Gypsum Ceiling service
├── services-spc.html          # SPC & Laminate Flooring service
├── services-partitioning.html # Office Partitioning service
├── portfolio.html             # Portfolio overview
├── residential_design.html    # Residential portfolio
├── commercial.html            # Commercial portfolio
├── hospitality.html           # Hospitality portfolio
├── transformations.html       # Before/After transformations
├── gallery.html               # Image & Video gallery
├── blog.html                  # Blog page
├── contact.html               # Contact page
├── terms.html                 # Terms & Conditions
├── privacy.html               # Privacy Policy
├── faqs.html                  # Frequently Asked Questions
├── css/
│   └── style.css              # Main stylesheet
├── js/
│   └── main.js                # Main JavaScript
├── img/                       # Images directory
│   ├── portfolio/             # Portfolio images
│   ├── services/              # Service images
│   └── blog/                  # Blog post images
├── lib/                       # Libraries
│   ├── owlcarousel/           # Owl Carousel
│   ├── lightbox/              # Lightbox
│   ├── easing/                # Easing animations
│   └── isotope/               # Isotope filter
└── README.md                  # This file
```

## 🚀 Installation & Setup

### Prerequisites
- Python 3.8+
- PostgreSQL 12+
- Git

### Local Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/VincentOracle/lajed-interiors.git
cd lajed-interiors
```

2. **Create a virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your credentials
```

5. **Configure PostgreSQL database**
```bash
createdb lajed_interiors
python manage.py db upgrade
```

6. **Run the application**
```bash
flask run
# or
python app.py
```

7. **Access the website**
Open `http://localhost:5000` in your browser

### Environment Variables
```
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:password@localhost/lajed_interiors
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 📄 Pages Overview

| Page | Description | Key Features |
|------|-------------|--------------|
| **Home** | Main landing page | Hero carousel, wavy gallery, services preview, testimonials |
| **About** | Company story | Mission, vision, core values, sourcing capabilities |
| **Services** | Service overview | Individual service pages with deep dives |
| **Portfolio** | Project showcase | Residential, Commercial, Hospitality, Transformations |
| **Gallery** | Visual collection | Image grid, video cards, lightbox viewer |
| **Blog** | Articles & insights | Categories, filters, engagement metrics |
| **Contact** | Get in touch | Validated form, WhatsApp redirect, map |

## 📸 Screenshots

### Homepage
<img width="1600" height="813" alt="image" src="https://github.com/user-attachments/assets/1b04579c-588e-4fb8-88a8-6c2a4c6e2500" />


*The main landing page featuring the hero section with auto-rotating slides and wavy carousel.*

### About Page
<img width="1593" height="768" alt="image" src="https://github.com/user-attachments/assets/da708068-11a6-4c23-9d32-4d3926baebcb" />

*Company story with mission, vision, and core values displayed in elegant cards.*

### Services Page
<img width="1582" height="774" alt="image" src="https://github.com/user-attachments/assets/0c84daf2-70e5-4bda-a415-ae3e9784b7af" />

*Service cards with icons and hover animations for each offering.*

<img width="1587" height="764" alt="image" src="https://github.com/user-attachments/assets/bb91373d-3e7f-4b1a-a7a5-fbb4922f3ced" />


### Portfolio Page
<img width="1589" height="770" alt="image" src="https://github.com/user-attachments/assets/74e3e5aa-e02b-4a16-97c5-2b8461031e52" />


*Project grid with masonry layout and hover overlays.*

### Blog Page
<img width="1587" height="812" alt="image" src="https://github.com/user-attachments/assets/080a7a4c-ae9f-409b-b364-2b080c4ee960" />

*Blog cards with categories, engagement metrics, and read more functionality.*

### Contact Page
<img width="1586" height="775" alt="image" src="https://github.com/user-attachments/assets/17500ce7-50fa-4400-8556-655b0a49f164" />

*Contact form with validation and integrated map.*

### Gallery Page
<img width="1589" height="767" alt="image" src="https://github.com/user-attachments/assets/8663a855-9464-448c-b3a4-cee03c19c5b2" />

*Image and video gallery with lightbox viewer.*

*Screenshots are located in the `/screenshots` directory.*

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Test your changes before submitting
- Update documentation as needed

## 📄 License

This project is proprietary and confidential. All rights reserved by LAJED INTERIORS.

## 👨‍💻 Author

**Were Vincent Ouma**

![GitHub](https://img.shields.io/badge/GitHub-VincentOracle-181717?style=flat&logo=github)
![LinkedIn](https://img.shields.io/badge/LinkedIn-Vincent%20Were-0077B5?style=flat&logo=linkedin)
![Twitter](https://img.shields.io/badge/Twitter-@Vincent_Ouma-1DA1F2?style=flat&logo=twitter)
![Email](https://img.shields.io/badge/Email-oumawere2001@gmail.com-D14836?style=flat&logo=gmail)

- **Portfolio:** [vincent.eontechsystems.com](https://vincent.eontechsystems.com)
- **GitHub:** [github.com/VincentOracle](https://github.com/VincentOracle)
- **LinkedIn:** [linkedin.com/in/vincent-were-4339313a0](https://linkedin.com/in/vincent-were-4339313a0)

## 🙏 Acknowledgments

- **LAJED INTERIORS** for the opportunity to build this premium website
- **Flask** community for the excellent Python framework
- **Bootstrap** team for the responsive grid system
- **Font Awesome** for the beautiful icons
- **Google Fonts** for the typography
- **All open source contributors** who make tools like this possible
- **Cloudinary** for seamless media management
- **PostgreSQL** for reliable database solutions

## 📊 Project Status

![Status](https://img.shields.io/badge/Status-Active-success.svg)
![Last Commit](https://img.shields.io/github/last-commit/VincentOracle/lajed-interiors)
![Stars](https://img.shields.io/github/stars/VincentOracle/lajed-interiors)

⭐ **Star this repository if you found it useful!**

---

Built with ❤️ by [Vincent Oracle](https://vincent.eontechsystems.com)
