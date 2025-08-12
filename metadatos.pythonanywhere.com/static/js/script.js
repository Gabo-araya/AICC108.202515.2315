/**
 * Metadatos App - JavaScript Mejorado
 * Funcionalidades interactivas y mejoras de UX
 */

// ===== VARIABLES GLOBALES =====
const MetadatosApp = {
  // Configuración
  config: {
    backToTopOffset: 300,
    scrollSmoothDuration: 800,
    alertAutoHideDelay: 5000,
    searchDelay: 300,
    animationDuration: 300,
  },

  // Estado de la aplicación
  state: {
    isScrolling: false,
    searchTimeout: null,
    darkMode: false,
    currentPage: null,
  },

  // Elementos DOM comunes
  elements: {
    backToTopBtn: null,
    alerts: null,
    searchInput: null,
    navbar: null,
    cards: null,
  },
};

// ===== UTILIDADES =====
const Utils = {
  /**
   * Debounce function para optimizar eventos
   */
  debounce: (func, wait, immediate) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  },

  /**
   * Throttle function para eventos de scroll
   */
  throttle: (func, limit) => {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  /**
   * Smooth scroll to element
   */
  smoothScrollTo: (target, duration = 800) => {
    const targetElement =
      typeof target === "string" ? document.querySelector(target) : target;
    if (!targetElement) return;

    const targetPosition = targetElement.offsetTop - 80; // Offset for fixed navbar
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = Utils.easeInOutQuad(
        timeElapsed,
        startPosition,
        distance,
        duration,
      );
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  },

  /**
   * Easing function for smooth animations
   */
  easeInOutQuad: (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  },

  /**
   * Format file size
   */
  formatFileSize: (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  },

  /**
   * Copy text to clipboard
   */
  copyToClipboard: async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const result = document.execCommand("copy");
        document.body.removeChild(textArea);
        return result;
      } catch (err) {
        document.body.removeChild(textArea);
        return false;
      }
    }
  },

  /**
   * Show toast notification
   */
  showToast: (message, type = "info", duration = 3000) => {
    const toastContainer =
      document.getElementById("toastContainer") || Utils.createToastContainer();

    const toast = document.createElement("div");
    toast.className = `toast align-items-center text-white bg-${type} border-0`;
    toast.setAttribute("role", "alert");
    toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    <i class="bi bi-${Utils.getToastIcon(type)} me-2"></i>
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        `;

    toastContainer.appendChild(toast);
    const bsToast = new bootstrap.Toast(toast, { delay: duration });
    bsToast.show();

    // Remove element after hiding
    toast.addEventListener("hidden.bs.toast", () => {
      toast.remove();
    });
  },

  /**
   * Create toast container if it doesn't exist
   */
  createToastContainer: () => {
    const container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container position-fixed bottom-0 end-0 p-3";
    container.style.zIndex = "1055";
    document.body.appendChild(container);
    return container;
  },

  /**
   * Get appropriate icon for toast type
   */
  getToastIcon: (type) => {
    const icons = {
      success: "check-circle-fill",
      danger: "exclamation-triangle-fill",
      warning: "exclamation-circle-fill",
      info: "info-circle-fill",
    };
    return icons[type] || "info-circle-fill";
  },
};

// ===== MÓDULOS PRINCIPALES =====

/**
 * Gestión de navegación y scroll
 */
const Navigation = {
  init: () => {
    Navigation.initBackToTop();
    Navigation.initSmoothScrolling();
    Navigation.initActiveNavigation();
    Navigation.initMobileMenu();
  },

  initBackToTop: () => {
    MetadatosApp.elements.backToTopBtn =
      document.getElementById("backToTopBtn");
    if (!MetadatosApp.elements.backToTopBtn) {
      Navigation.createBackToTopButton();
    }

    const toggleBackToTop = Utils.throttle(() => {
      const show = window.pageYOffset > MetadatosApp.config.backToTopOffset;
      MetadatosApp.elements.backToTopBtn.style.display = show ? "flex" : "none";
    }, 100);

    window.addEventListener("scroll", toggleBackToTop);

    MetadatosApp.elements.backToTopBtn.addEventListener("click", (e) => {
      e.preventDefault();
      Utils.smoothScrollTo(document.body);
    });
  },

  createBackToTopButton: () => {
    const btn = document.createElement("button");
    btn.id = "backToTopBtn";
    btn.type = "button";
    btn.className =
      "btn btn-primary btn-floating position-fixed bottom-0 end-0 m-3";
    btn.style.display = "none";
    btn.style.zIndex = "1050";
    btn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    btn.setAttribute("aria-label", "Volver arriba");
    btn.setAttribute("title", "Volver arriba");

    document.body.appendChild(btn);
    MetadatosApp.elements.backToTopBtn = btn;
  },

  initSmoothScrolling: () => {
    document.addEventListener("click", (e) => {
      // Buscar el enlace más cercano
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const href = link.getAttribute("href");

      // Validar que el href existe y no es solo '#'
      if (!href || href === "#" || href.length <= 1) return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        Utils.smoothScrollTo(target);

        // Update URL without jumping
        if (history.pushState) {
          history.pushState(null, null, href);
        }
      }
    });
  },

  initActiveNavigation: () => {
    const navLinks = document.querySelectorAll(".nav-link");
    const currentPath = window.location.pathname;

    navLinks.forEach((link) => {
      try {
        // Verificar que el href existe y es válido
        if (!link.href || link.href === "" || link.href === "#") {
          return;
        }

        // Verificar si es una URL relativa o absoluta
        let linkPath;
        if (
          link.href.startsWith("http://") ||
          link.href.startsWith("https://")
        ) {
          // URL absoluta
          linkPath = new URL(link.href).pathname;
        } else {
          // URL relativa - usar directamente el href
          linkPath = link.getAttribute("href");
        }

        if (linkPath === currentPath) {
          link.classList.add("active");
        }
      } catch (error) {
        // Si hay error con la URL, intentar comparación directa
        console.warn("Error procesando URL de navegación:", link.href, error);
        const href = link.getAttribute("href");
        if (href && href === currentPath) {
          link.classList.add("active");
        }
      }
    });
  },

  initMobileMenu: () => {
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    if (navbarToggler && navbarCollapse) {
      // Close mobile menu when clicking on links
      navbarCollapse.addEventListener("click", (e) => {
        if (e.target.matches(".nav-link")) {
          const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
            toggle: false,
          });
          bsCollapse.hide();
        }
      });
    }
  },
};

/**
 * Gestión de formularios
 */
const Forms = {
  init: () => {
    Forms.initValidation();
    Forms.initFileUpload();
    Forms.initSearch();
    Forms.initCharacterCount();
  },

  initValidation: () => {
    const forms = document.querySelectorAll(
      ".needs-validation, form[novalidate]",
    );

    forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        if (!form.checkValidity()) {
          e.preventDefault();
          e.stopPropagation();
        }
        form.classList.add("was-validated");
      });

      // Real-time validation
      const inputs = form.querySelectorAll("input, textarea, select");
      inputs.forEach((input) => {
        input.addEventListener("blur", () => {
          if (input.checkValidity()) {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
          } else {
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
          }
        });

        input.addEventListener("input", () => {
          if (input.classList.contains("is-invalid") && input.checkValidity()) {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
          }
        });
      });
    });
  },

  initFileUpload: () => {
    const fileInputs = document.querySelectorAll('input[type="file"]');

    fileInputs.forEach((input) => {
      input.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (!file) return;

        Forms.displayFileInfo(input, file);
        Forms.validateFileSize(input, file);
        Forms.autoFillTitle(input, file);
      });
    });
  },

  displayFileInfo: (input, file) => {
    let infoDiv = input.parentNode.querySelector(".file-info");
    if (!infoDiv) {
      infoDiv = document.createElement("div");
      infoDiv.className = "file-info alert alert-info mt-2";
      input.parentNode.appendChild(infoDiv);
    }

    const fileSize = Utils.formatFileSize(file.size);
    const fileIcon = Forms.getFileIcon(file.name);

    infoDiv.innerHTML = `
            <i class="bi ${fileIcon} me-2"></i>
            <strong>Archivo seleccionado:</strong> ${file.name}<br>
            <small class="text-muted">Tamaño: ${fileSize} | Tipo: ${file.type || "Desconocido"}</small>
        `;
  },

  validateFileSize: (input, file) => {
    const maxSize = 16 * 1024 * 1024; // 16MB

    if (file.size > maxSize) {
      input.setCustomValidity(
        "El archivo es demasiado grande. Tamaño máximo: 16MB",
      );
      input.classList.add("is-invalid");
      Utils.showToast(
        "El archivo es demasiado grande. Tamaño máximo permitido: 16MB",
        "danger",
      );
    } else {
      input.setCustomValidity("");
      input.classList.remove("is-invalid");
    }
  },

  autoFillTitle: (input, file) => {
    const titleInput = document.getElementById("title");
    if (titleInput && !titleInput.value.trim()) {
      const filename = file.name;
      const nameWithoutExt =
        filename.substring(0, filename.lastIndexOf(".")) || filename;
      const cleanTitle = nameWithoutExt
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());
      titleInput.value = cleanTitle;
      titleInput.dispatchEvent(new Event("input"));
    }
  },

  getFileIcon: (filename) => {
    const ext = filename.split(".").pop().toLowerCase();
    const iconMap = {
      pdf: "bi-file-earmark-pdf-fill text-danger",
      doc: "bi-file-earmark-word-fill text-primary",
      docx: "bi-file-earmark-word-fill text-primary",
      xls: "bi-file-earmark-excel-fill text-success",
      xlsx: "bi-file-earmark-excel-fill text-success",
      jpg: "bi-file-earmark-image-fill text-info",
      jpeg: "bi-file-earmark-image-fill text-info",
      png: "bi-file-earmark-image-fill text-info",
      gif: "bi-file-earmark-image-fill text-info",
      zip: "bi-file-earmark-zip-fill text-dark",
      rar: "bi-file-earmark-zip-fill text-dark",
      mp3: "bi-file-earmark-music-fill text-purple",
      mp4: "bi-file-earmark-play-fill text-danger",
    };
    return iconMap[ext] || "bi-file-earmark text-muted";
  },

  initSearch: () => {
    MetadatosApp.elements.searchInput = document.querySelector(
      'input[name="search"]',
    );
    if (!MetadatosApp.elements.searchInput) return;

    const searchForm = MetadatosApp.elements.searchInput.closest("form");

    // Auto-submit on typing (with debounce)
    MetadatosApp.elements.searchInput.addEventListener(
      "input",
      Utils.debounce((e) => {
        if (e.target.value.length >= 2 || e.target.value.length === 0) {
          searchForm.submit();
        }
      }, MetadatosApp.config.searchDelay),
    );

    // Clear search button functionality
    const clearBtn = searchForm.querySelector(".btn-outline-secondary");
    if (clearBtn && clearBtn.querySelector(".bi-x-lg")) {
      clearBtn.addEventListener("click", (e) => {
        e.preventDefault();
        MetadatosApp.elements.searchInput.value = "";
        searchForm.submit();
      });
    }
  },

  initCharacterCount: () => {
    const textInputs = document.querySelectorAll(
      "input[maxlength], textarea[maxlength]",
    );

    textInputs.forEach((input) => {
      const maxLength = parseInt(input.getAttribute("maxlength"));
      if (!maxLength) return;

      Forms.updateCharacterCount(input, maxLength);

      input.addEventListener("input", () => {
        Forms.updateCharacterCount(input, maxLength);
      });
    });
  },

  updateCharacterCount: (input, maxLength) => {
    const currentLength = input.value.length;
    const remaining = maxLength - currentLength;

    let countDiv = input.parentNode.querySelector(".char-count");
    if (!countDiv) {
      countDiv = document.createElement("div");
      countDiv.className = "form-text char-count small";
      input.parentNode.appendChild(countDiv);
    }

    countDiv.textContent = `${currentLength}/${maxLength} caracteres`;

    // Color coding
    if (remaining < 20) {
      countDiv.className = "form-text char-count small text-warning";
    } else if (remaining < 5) {
      countDiv.className = "form-text char-count small text-danger";
    } else {
      countDiv.className = "form-text char-count small text-muted";
    }
  },
};

/**
 * Gestión de tarjetas y animaciones
 */
const Cards = {
  init: () => {
    Cards.initHoverEffects();
    Cards.initLazyLoading();
    Cards.initImageHandling();
  },

  initHoverEffects: () => {
    MetadatosApp.elements.cards = document.querySelectorAll(".card");

    MetadatosApp.elements.cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-5px)";
        card.style.transition = "transform 0.3s ease";
        card.style.boxShadow = "0 0.5rem 1rem rgba(0, 0, 0, 0.15)";
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0)";
        card.style.boxShadow = "0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)";
      });
    });
  },

  initLazyLoading: () => {
    const images = document.querySelectorAll("img[data-src]");

    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove("lazy");
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach((img) => imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      images.forEach((img) => {
        img.src = img.dataset.src;
        img.classList.remove("lazy");
      });
    }
  },

  initImageHandling: () => {
    const images = document.querySelectorAll("img");

    images.forEach((img) => {
      img.addEventListener("error", function () {
        this.style.display = "none";

        let errorDiv = this.parentNode.querySelector(".image-error");
        if (!errorDiv) {
          errorDiv = document.createElement("div");
          errorDiv.className = "image-error alert alert-warning text-center";
          errorDiv.innerHTML =
            '<i class="bi bi-exclamation-triangle me-2"></i>No se pudo cargar la imagen';
          this.parentNode.appendChild(errorDiv);
        }
      });

      img.addEventListener("load", function () {
        this.classList.add("loaded");
      });
    });
  },
};

/**
 * Gestión de alertas y notificaciones
 */
const Alerts = {
  init: () => {
    Alerts.initAutoHide();
    Alerts.initDismissible();
  },

  initAutoHide: () => {
    MetadatosApp.elements.alerts =
      document.querySelectorAll(".alert-dismissible");

    MetadatosApp.elements.alerts.forEach((alert) => {
      setTimeout(() => {
        if (alert.parentNode) {
          const bsAlert = new bootstrap.Alert(alert);
          bsAlert.close();
        }
      }, MetadatosApp.config.alertAutoHideDelay);
    });
  },

  initDismissible: () => {
    document.addEventListener("click", (e) => {
      if (e.target.matches(".alert .btn-close")) {
        const alert = e.target.closest(".alert");
        alert.style.opacity = "0";
        alert.style.transform = "translateX(100%)";
        setTimeout(() => {
          if (alert.parentNode) {
            alert.remove();
          }
        }, 300);
      }
    });
  },
};

/**
 * Funciones específicas de páginas
 */
const PageSpecific = {
  init: () => {
    const currentPage = document.body.className
      .split(" ")
      .find((cls) => cls.endsWith("-page"));
    MetadatosApp.state.currentPage = currentPage;

    switch (currentPage) {
      case "admin-page":
        PageSpecific.initAdminPage();
        break;
      case "login-page":
        PageSpecific.initLoginPage();
        break;
      case "help-page":
        PageSpecific.initHelpPage();
        break;
      case "file-detail-page":
        PageSpecific.initFileDetailPage();
        break;
    }
  },

  initAdminPage: () => {
    // Confirmación de eliminación de archivos
    window.confirmDelete = (fileId, fileName) => {
      const modal = document.getElementById("deleteModal");
      if (modal) {
        document.getElementById("fileToDelete").textContent = fileName;
        document.getElementById("deleteForm").action =
          `/admin/delete/${fileId}`;

        const deleteModal = new bootstrap.Modal(modal);
        deleteModal.show();
      }
    };

    // Progress bar para subidas
    const uploadForm = document.getElementById("uploadForm");
    if (uploadForm) {
      uploadForm.addEventListener("submit", (e) => {
        if (uploadForm.checkValidity()) {
          PageSpecific.showUploadProgress();
        }
      });
    }

    // Auto-save draft (localStorage)
    PageSpecific.initAutoSave();
  },

  initLoginPage: () => {
    // Password visibility toggle
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");
    const toggleIcon = document.getElementById("toggleIcon");

    if (togglePassword && passwordInput && toggleIcon) {
      togglePassword.addEventListener("click", () => {
        const type =
          passwordInput.getAttribute("type") === "password"
            ? "text"
            : "password";
        passwordInput.setAttribute("type", type);
        toggleIcon.className =
          type === "password" ? "bi bi-eye" : "bi bi-eye-slash";
      });
    }

    // Focus management
    const usernameInput = document.getElementById("username");
    if (usernameInput) {
      usernameInput.focus();
    }

    // Remember me functionality (visual only)
    const rememberMe = document.getElementById("rememberMe");
    if (rememberMe) {
      rememberMe.addEventListener("change", (e) => {
        if (e.target.checked) {
          Utils.showToast(
            "La sesión se recordará por más tiempo",
            "info",
            2000,
          );
        }
      });
    }
  },

  initHelpPage: () => {
    // Smooth scrolling for help navigation
    const helpNavLinks = document.querySelectorAll('.btn[href^="#"]');
    helpNavLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (target) {
          Utils.smoothScrollTo(target);
          link.classList.add("active");

          // Remove active class from others
          helpNavLinks.forEach((otherLink) => {
            if (otherLink !== link) {
              otherLink.classList.remove("active");
            }
          });
        }
      });
    });

    // FAQ accordion auto-collapse
    const accordions = document.querySelectorAll(".accordion");
    accordions.forEach((accordion) => {
      accordion.addEventListener("show.bs.collapse", (e) => {
        const openItem = accordion.querySelector(".collapse.show");
        if (openItem && openItem !== e.target) {
          const bsCollapse = new bootstrap.Collapse(openItem, {
            toggle: false,
          });
          bsCollapse.hide();
        }
      });
    });
  },

  initFileDetailPage: () => {
    // Copy link functionality
    window.copyLink = () => {
      const url = window.location.href;
      Utils.copyToClipboard(url).then((success) => {
        const btn = event.target.closest("button");
        const originalText = btn.innerHTML;

        if (success) {
          btn.innerHTML = '<i class="bi bi-check2 me-1"></i>¡Copiado!';
          btn.classList.remove("btn-outline-info");
          btn.classList.add("btn-success");

          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove("btn-success");
            btn.classList.add("btn-outline-info");
          }, 2000);
        } else {
          Utils.showToast("Error al copiar el enlace", "danger");
        }
      });
    };

    // Confirm delete function
    window.confirmDelete = () => {
      const deleteModal = new bootstrap.Modal(
        document.getElementById("deleteModal"),
      );
      deleteModal.show();
    };

    // Image zoom functionality
    const images = document.querySelectorAll(".preview-image");
    images.forEach((img) => {
      img.addEventListener("click", () => {
        PageSpecific.openImageModal(img);
      });
    });
  },

  showUploadProgress: () => {
    const submitBtn = document.getElementById("submitBtn");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML =
        '<i class="bi bi-hourglass-split me-1"></i>Subiendo...';

      // Create progress bar
      const progressDiv = document.createElement("div");
      progressDiv.className = "mt-3";
      progressDiv.innerHTML = `
                <div class="progress">
                    <div class="progress-bar progress-bar-striped progress-bar-animated"
                         role="progressbar" style="width: 100%"
                         aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                        Procesando archivo...
                    </div>
                </div>
            `;
      submitBtn.parentNode.appendChild(progressDiv);
    }
  },

  initAutoSave: () => {
    const titleInput = document.getElementById("title");
    const descriptionInput = document.getElementById("description");
    const subjectInput = document.getElementById("subject");

    const saveToStorage = Utils.debounce(() => {
      const draft = {
        title: titleInput?.value || "",
        description: descriptionInput?.value || "",
        subject: subjectInput?.value || "",
        timestamp: Date.now(),
      };

      try {
        localStorage.setItem("metadatos_draft", JSON.stringify(draft));
      } catch (e) {
        console.warn("No se pudo guardar el borrador:", e);
      }
    }, 1000);

    const loadFromStorage = () => {
      try {
        const draft = JSON.parse(
          localStorage.getItem("metadatos_draft") || "{}",
        );
        const isRecent =
          Date.now() - (draft.timestamp || 0) < 24 * 60 * 60 * 1000; // 24 hours

        if (isRecent && (draft.title || draft.description || draft.subject)) {
          const restore = confirm(
            "Se encontró un borrador guardado. ¿Deseas restaurarlo?",
          );
          if (restore) {
            if (titleInput && draft.title) titleInput.value = draft.title;
            if (descriptionInput && draft.description)
              descriptionInput.value = draft.description;
            if (subjectInput && draft.subject)
              subjectInput.value = draft.subject;

            Utils.showToast("Borrador restaurado correctamente", "success");
          }
        }
      } catch (e) {
        console.warn("No se pudo cargar el borrador:", e);
      }
    };

    // Load draft on page load
    if (titleInput || descriptionInput || subjectInput) {
      loadFromStorage();
    }

    // Save draft on input
    [titleInput, descriptionInput, subjectInput].forEach((input) => {
      if (input) {
        input.addEventListener("input", saveToStorage);
      }
    });

    // Clear draft on successful submit
    const forms = document.querySelectorAll("form");
    forms.forEach((form) => {
      form.addEventListener("submit", () => {
        try {
          localStorage.removeItem("metadatos_draft");
        } catch (e) {
          console.warn("No se pudo limpiar el borrador:", e);
        }
      });
    });
  },

  openImageModal: (img) => {
    // Create modal for image zoom
    const modal = document.createElement("div");
    modal.className = "modal fade";
    modal.innerHTML = `
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Vista Ampliada</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body text-center">
                        <img src="${img.src}" alt="${img.alt}" class="img-fluid">
                    </div>
                </div>
            </div>
        `;

    document.body.appendChild(modal);
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();

    // Remove modal after hiding
    modal.addEventListener("hidden.bs.modal", () => {
      modal.remove();
    });
  },
};

/**
 * Funciones de accesibilidad
 */
const Accessibility = {
  init: () => {
    Accessibility.initKeyboardNavigation();
    Accessibility.initFocusManagement();
    Accessibility.initScreenReaderSupport();
  },

  initKeyboardNavigation: () => {
    document.addEventListener("keydown", (e) => {
      // Alt + M: Go to main content
      if (e.altKey && e.key === "m") {
        e.preventDefault();
        const mainContent =
          document.getElementById("main-content") ||
          document.querySelector("main");
        if (mainContent) {
          mainContent.focus();
          mainContent.scrollIntoView();
        }
      }

      // Alt + N: Go to navigation
      if (e.altKey && e.key === "n") {
        e.preventDefault();
        const nav =
          document.querySelector("nav") || document.querySelector(".navbar");
        if (nav) {
          const firstLink = nav.querySelector("a");
          if (firstLink) firstLink.focus();
        }
      }

      // Escape: Close modals and dropdowns
      if (e.key === "Escape") {
        const openModal = document.querySelector(".modal.show");
        const openDropdown = document.querySelector(".dropdown-menu.show");

        if (openModal) {
          const bsModal = bootstrap.Modal.getInstance(openModal);
          if (bsModal) bsModal.hide();
        }

        if (openDropdown) {
          const dropdown = bootstrap.Dropdown.getInstance(
            openDropdown.previousElementSibling,
          );
          if (dropdown) dropdown.hide();
        }
      }
    });
  },

  initFocusManagement: () => {
    // Trap focus in modals
    document.addEventListener("shown.bs.modal", (e) => {
      const modal = e.target;
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );

      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    });

    // Skip links
    const skipLink = document.createElement("a");
    skipLink.href = "#main-content";
    skipLink.className =
      "visually-hidden-focusable position-absolute top-0 start-0 p-2 bg-primary text-white";
    skipLink.textContent = "Ir al contenido principal";
    skipLink.style.zIndex = "9999";

    document.body.insertBefore(skipLink, document.body.firstChild);
  },

  initScreenReaderSupport: () => {
    // Add live region for dynamic content
    const liveRegion = document.createElement("div");
    liveRegion.setAttribute("aria-live", "polite");
    liveRegion.setAttribute("aria-atomic", "true");
    liveRegion.className = "visually-hidden";
    liveRegion.id = "live-region";
    document.body.appendChild(liveRegion);

    // Announce page changes
    window.announceToScreenReader = (message) => {
      liveRegion.textContent = message;
      setTimeout(() => {
        liveRegion.textContent = "";
      }, 1000);
    };

    // Add aria-labels to buttons without text
    const iconButtons = document.querySelectorAll(
      "button:not([aria-label]):not([aria-labelledby])",
    );
    iconButtons.forEach((btn) => {
      const icon = btn.querySelector('i[class*="bi-"]');
      if (icon && !btn.textContent.trim()) {
        const iconClass = icon.className;
        let label = "Botón";

        if (iconClass.includes("trash")) label = "Eliminar";
        else if (iconClass.includes("edit")) label = "Editar";
        else if (iconClass.includes("eye")) label = "Ver";
        else if (iconClass.includes("download")) label = "Descargar";
        else if (iconClass.includes("search")) label = "Buscar";

        btn.setAttribute("aria-label", label);
      }
    });
  },
};

/**
 * Funciones de performance
 */
const Performance = {
  init: () => {
    Performance.initLazyLoading();
    Performance.initImageOptimization();
    Performance.initPreloadCriticalResources();
  },

  initLazyLoading: () => {
    // Already handled in Cards module, but we can add more optimizations
    const lazyElements = document.querySelectorAll("[data-lazy]");

    if ("IntersectionObserver" in window) {
      const lazyObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const element = entry.target;

              // Load background images
              if (element.dataset.lazybg) {
                element.style.backgroundImage = `url(${element.dataset.lazybg})`;
              }

              // Load iframe content
              if (element.tagName === "IFRAME" && element.dataset.lazysrc) {
                element.src = element.dataset.lazysrc;
              }

              element.classList.remove("lazy");
              lazyObserver.unobserve(element);
            }
          });
        },
        {
          rootMargin: "50px",
        },
      );

      lazyElements.forEach((el) => lazyObserver.observe(el));
    }
  },

  initImageOptimization: () => {
    const images = document.querySelectorAll("img");

    images.forEach((img) => {
      // Add loading="lazy" if not already present
      if (!img.getAttribute("loading")) {
        img.setAttribute("loading", "lazy");
      }

      // Add decode="async" for better performance
      img.setAttribute("decode", "async");
    });
  },

  initPreloadCriticalResources: () => {
    // Preload critical CSS and fonts
    const criticalResources = [
      { href: "/static/css/style.css", as: "style" },
      {
        href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css",
        as: "style",
      },
    ];

    criticalResources.forEach((resource) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = resource.href;
      link.as = resource.as;
      if (resource.crossorigin) link.crossOrigin = resource.crossorigin;
      document.head.appendChild(link);
    });
  },
};

// ===== INICIALIZACIÓN PRINCIPAL =====
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Metadatos App iniciando...");

  try {
    // Verificar que estamos en un entorno de navegador válido
    if (typeof window === "undefined" || typeof document === "undefined") {
      throw new Error("Entorno de navegador no disponible");
    }

    // Inicializar todos los módulos con manejo individual de errores
    const modules = [
      { name: "Navigation", init: Navigation.init },
      { name: "Forms", init: Forms.init },
      { name: "Cards", init: Cards.init },
      { name: "Alerts", init: Alerts.init },
      { name: "PageSpecific", init: PageSpecific.init },
      { name: "Accessibility", init: Accessibility.init },
      { name: "Performance", init: Performance.init },
    ];

    modules.forEach((module) => {
      try {
        module.init();
        console.log(`✅ ${module.name} inicializado correctamente`);
      } catch (error) {
        console.warn(`⚠️ Error al inicializar ${module.name}:`, error);
        // Continuar con los otros módulos
      }
    });

    console.log("✅ Metadatos App iniciado correctamente");

    // Anunciar que la aplicación está lista
    if (window.announceToScreenReader) {
      window.announceToScreenReader("Aplicación cargada correctamente");
    }
  } catch (error) {
    console.error("❌ Error crítico al inicializar Metadatos App:", error);

    // Fallback mínimo para funcionalidad básica
    try {
      // Al menos intentar inicializar funcionalidades críticas
      if (typeof Utils !== "undefined" && Utils.showToast) {
        Utils.showToast(
          "Error al cargar algunas funcionalidades. La aplicación puede no funcionar correctamente.",
          "danger",
          5000,
        );
      } else {
        // Fallback de fallback
        const alertDiv = document.createElement("div");
        alertDiv.className =
          "alert alert-danger alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3";
        alertDiv.style.zIndex = "9999";
        alertDiv.innerHTML = `
                    <i class="bi bi-exclamation-triangle-fill me-2"></i>
                    Error al cargar la aplicación. Algunas funcionalidades pueden no estar disponibles.
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                `;
        document.body.appendChild(alertDiv);

        // Auto-remove after 10 seconds
        setTimeout(() => {
          if (alertDiv.parentNode) {
            alertDiv.remove();
          }
        }, 10000);
      }
    } catch (fallbackError) {
      console.error("❌ Error en fallback:", fallbackError);
    }
  }
});

// ===== MANEJO DE ERRORES GLOBALES =====
window.addEventListener("error", (e) => {
  console.error("Error JavaScript:", e.error);
  console.error("Archivo:", e.filename);
  console.error("Línea:", e.lineno);
  console.error("Columna:", e.colno);

  // Solo mostrar toast si Utils está disponible
  if (typeof Utils !== "undefined" && Utils.showToast) {
    Utils.showToast("Se produjo un error inesperado", "danger");
  }
});

window.addEventListener("unhandledrejection", (e) => {
  console.error("Promise rechazada:", e.reason);

  // Solo mostrar toast si Utils está disponible
  if (typeof Utils !== "undefined" && Utils.showToast) {
    Utils.showToast("Error al procesar la solicitud", "danger");
  }
});

// ===== FUNCIÓN DE DEBUG =====
window.debugMetadatosApp = function () {
  console.log("=== DEBUG METADATOS APP ===");
  console.log("URL actual:", window.location.href);
  console.log("Pathname:", window.location.pathname);
  console.log("Enlaces de navegación encontrados:");

  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link, index) => {
    console.log(
      `  ${index + 1}. href="${link.href}" getAttribute("href")="${link.getAttribute("href")}"`,
    );
  });

  console.log("Estado de módulos:");
  console.log("  Navigation:", typeof Navigation !== "undefined" ? "✅" : "❌");
  console.log("  Forms:", typeof Forms !== "undefined" ? "✅" : "❌");
  console.log("  Cards:", typeof Cards !== "undefined" ? "✅" : "❌");
  console.log("  Utils:", typeof Utils !== "undefined" ? "✅" : "❌");

  console.log(
    "Bootstrap disponible:",
    typeof bootstrap !== "undefined" ? "✅" : "❌",
  );
  console.log("=== FIN DEBUG ===");
};

// ===== EXPORTAR PARA USO GLOBAL =====
window.MetadatosApp = MetadatosApp;
window.Utils = Utils;

console.log("📄 Metadatos App JavaScript cargado");
