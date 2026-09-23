(function () {
  "use strict";

  /* =========================================================
     TECHVYAPAN — DEVELOPER CREDIT / LICENSE PROTECTION
     Developer: Suraj Dev
     Website: https://www.surajdev.com/

     IMPORTANT:
     This is a client-side protection mechanism.
     It is designed to stop normal use if the developer credit
     is removed or modified. It is NOT a tamper-proof license
     system because browser-side JavaScript can always be
     inspected or modified by someone with technical access.
     ========================================================= */

  var CREDIT_SELECTOR = '[data-dev-credit="suraj-dev"]';
  var REQUIRED_NAME = "suraj dev";
  var REQUIRED_DOMAIN = "surajdev.com";

  var licenseValid = false;
  var licenseFailed = false;
  var creditObserver = null;

  function normalizeText(value) {
    return String(value || "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  function isValidCredit() {
    var credit = document.querySelector(CREDIT_SELECTOR);

    if (!credit) {
      return false;
    }

    /*
     * Verify the developer credit is inside the footer.
     */
    var footer = credit.closest("footer");

    if (!footer) {
      return false;
    }

    /*
     * Verify the expected developer name exists.
     */
    var creditText = normalizeText(credit.textContent);

    if (
      creditText.indexOf("built by") === -1 ||
      creditText.indexOf(REQUIRED_NAME) === -1
    ) {
      return false;
    }

    /*
     * Verify the link exists.
     */
    var creditLink = credit.querySelector("a");

    if (!creditLink) {
      return false;
    }

    /*
     * Verify the actual link points to surajdev.com.
     */
    var href = normalizeText(creditLink.getAttribute("href"));

    if (href.indexOf(REQUIRED_DOMAIN) === -1) {
      return false;
    }

    /*
     * Verify the visible link text.
     */
    var linkText = normalizeText(creditLink.textContent);

    if (linkText !== REQUIRED_NAME) {
      return false;
    }

    /*
     * Verify the data attributes added to the footer.
     */
    if (credit.getAttribute("data-dev-credit") !== "suraj-dev") {
      return false;
    }

    if (credit.getAttribute("data-dev-name") !== "Suraj Dev") {
      return false;
    }

    if (
      credit.getAttribute("data-dev-url") !==
      "https://www.surajdev.com/"
    ) {
      return false;
    }

    return true;
  }

  /*
   * Disable functionality if the credit is removed or modified.
   */
  function disableTechVyapanJS(reason) {
    if (licenseFailed) {
      return;
    }

    licenseFailed = true;
    licenseValid = false;

    console.warn(
      "TechVyapan JS stopped: required Suraj Dev developer credit is missing or has been modified."
    );

    if (reason) {
      console.warn("Reason:", reason);
    }

    /*
     * Close any open modal.
     */
    var overlay = document.getElementById("catModalOverlay");

    if (overlay) {
      overlay.classList.remove("open");
    }

    /*
     * Disable navigation toggle.
     */
    var navtoggle = document.getElementById("navtoggle");

    if (navtoggle) {
      navtoggle.disabled = true;
      navtoggle.setAttribute("aria-disabled", "true");
    }

    /*
     * Disable category interactions.
     */
    document.querySelectorAll(".cat-cell").forEach(function (cell) {
      cell.setAttribute("aria-disabled", "true");
      cell.style.pointerEvents = "none";
    });

    /*
     * Disable modal controls.
     */
    document
      .querySelectorAll(
        "#modalClose, #modalCta, .modal-overlay"
      )
      .forEach(function (element) {
        element.setAttribute("aria-disabled", "true");
      });

    /*
     * Disable enquiry form submission.
     */
    var form = document.getElementById("enquiryForm");

    if (form) {
      form.setAttribute("data-js-disabled", "true");

      form.addEventListener(
        "submit",
        function (event) {
          event.preventDefault();
          event.stopImmediatePropagation();

          var status = document.getElementById("form-status");

          if (status) {
            status.textContent =
              "This website configuration is invalid.";
            status.style.color = "#E58F8F";
          }

          return false;
        },
        true
      );
    }

    /*
     * Stop ticker animation.
     */
    var ticker = document.getElementById("ticker");

    if (ticker) {
      ticker.style.animation = "none";
    }

    /*
     * Mark the page as invalid.
     */
    document.documentElement.setAttribute(
      "data-techvyapan-license",
      "invalid"
    );
  }

  /*
   * Verify before ANY website functionality starts.
   */
  if (!isValidCredit()) {
    disableTechVyapanJS(
      "Suraj Dev credit was not found in the footer."
    );

    return;
  }

  licenseValid = true;

  document.documentElement.setAttribute(
    "data-techvyapan-license",
    "valid"
  );

  /*
   * Monitor the footer continuously.
   *
   * If someone removes or modifies the credit after page load,
   * the JS will detect the change.
   */
  if ("MutationObserver" in window) {
    creditObserver = new MutationObserver(function () {
      if (!isValidCredit()) {
        creditObserver.disconnect();

        disableTechVyapanJS(
          "Developer credit was removed or modified after page load."
        );
      }
    });

    creditObserver.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true
    });
  }


  /* =========================================================
     PRELOADER
     ========================================================= */

  (function () {
    var start = Date.now();
    var minShow = 500;

    function hidePreloader() {
      if (!licenseValid || licenseFailed) {
        return;
      }

      var elapsed = Date.now() - start;
      var wait = Math.max(minShow - elapsed, 0);

      setTimeout(function () {
        if (!licenseValid || licenseFailed) {
          return;
        }

        var pre = document.getElementById("preloader");

        document.body.classList.remove("loading");

        if (pre) {
          pre.classList.add("hide");

          setTimeout(function () {
            if (pre && pre.parentNode) {
              pre.remove();
            }
          }, 450);
        }
      }, wait);
    }

    if (document.readyState === "complete") {
      hidePreloader();
    } else {
      window.addEventListener("load", hidePreloader);

      setTimeout(hidePreloader, 3000);
    }
  })();


  /* =========================================================
     MOBILE NAVIGATION
     ========================================================= */

  var navtoggle = document.getElementById("navtoggle");
  var mobilenav = document.getElementById("mobilenav");

  if (navtoggle && mobilenav) {
    navtoggle.addEventListener("click", function () {
      if (!licenseValid || licenseFailed) {
        return;
      }

      var isOpen = mobilenav.classList.toggle("open");

      navtoggle.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      navtoggle.textContent = isOpen ? "CLOSE" : "MENU";
    });

    document
      .querySelectorAll("#mobilenav a")
      .forEach(function (a) {
        a.addEventListener("click", function () {
          if (!licenseValid || licenseFailed) {
            return;
          }

          mobilenav.classList.remove("open");

          navtoggle.textContent = "MENU";

          navtoggle.setAttribute(
            "aria-expanded",
            "false"
          );
        });
      });
  }


  /* =========================================================
     CATEGORY DATA
     ========================================================= */

  var catData = {
    "01": {
      title: "IT Products &amp; Solutions",
      icon:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="12" rx="1"/><path d="M1 19h22l-2-3H3z"/></svg>',
      desc:
        "Core computing hardware for offices of every size.",
      items: [
        "Servers",
        "Laptops",
        "Desktops",
        "Printers",
        "Workstations",
        "Projectors",
        "Monitors",
        "Thin clients"
      ]
    },

    "03": {
      title: "Networking",
      icon:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8.5a10 10 0 0 1 14 0"/><path d="M7.8 11.3a6 6 0 0 1 8.4 0"/><path d="M10.6 14a2.2 2.2 0 0 1 2.8 0"/></svg>',
      desc:
        "Networking equipment for offices of every size.",
      items: [
        "Routers / switches",
        "UTM / firewall",
        "Access points",
        "Structured cabling",
        "Network cables",
        "Patch panels",
        "Modems"
      ]
    },

    "04": {
      title: "Security &amp; Surveillance",
      icon:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="13" height="9" rx="2"/><circle cx="9.5" cy="12.5" r="2.4"/><path d="M16 10.5l5-2.5v9l-5-2.5"/></svg>',
      desc:
        "Security appliances and surveillance systems for every site.",
      items: [
        "CCTV cameras",
        "NVR / DVR systems",
        "Access control",
        "UTM &amp; firewall appliances"
      ]
    },

    "07": {
      title: "Software &amp; Licensing",
      icon:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="1.5"/><path d="M3 8h18"/><path d="M6 12h9M6 15h6"/></svg>',
      desc:
        "Software for productivity, security and operations.",
      items: [
        "Windows",
        "Microsoft 365",
        "Office suite",
        "Antivirus",
        "Design &amp; multimedia",
        "Project management"
      ]
    }
  };


  /* =========================================================
     CATEGORY MODAL
     ========================================================= */

  var overlay =
    document.getElementById("catModalOverlay");

  var modalTitle =
    document.getElementById("modalTitle");

  var modalIcon =
    document.getElementById("modalIcon");

  var modalDesc =
    document.getElementById("modalDesc");

  var modalItems =
    document.getElementById("modalItems");

  var lastFocused = null;

  function openCatModal(code) {
    if (!licenseValid || licenseFailed) {
      return;
    }

    var d = catData[code];

    if (!d) {
      return;
    }

    modalTitle.innerHTML = d.title;

    modalIcon.innerHTML = d.icon;

    modalDesc.textContent = d.desc;

    modalItems.innerHTML = "";

    d.items.forEach(function (item) {
      var li = document.createElement("li");

      li.innerHTML = item;

      modalItems.appendChild(li);
    });

    lastFocused = document.activeElement;

    overlay.classList.add("open");

    document
      .getElementById("modalClose")
      .focus();
  }

  function closeCatModal() {
    if (!licenseValid || licenseFailed) {
      return;
    }

    overlay.classList.remove("open");

    if (lastFocused) {
      lastFocused.focus();
    }
  }

  document
    .querySelectorAll(".cat-cell")
    .forEach(function (cell) {

      cell.addEventListener("click", function () {
        if (!licenseValid || licenseFailed) {
          return;
        }

        openCatModal(
          cell.getAttribute("data-cat")
        );
      });

      cell.addEventListener("keydown", function (e) {
        if (!licenseValid || licenseFailed) {
          return;
        }

        if (
          e.key === "Enter" ||
          e.key === " "
        ) {
          e.preventDefault();

          openCatModal(
            cell.getAttribute("data-cat")
          );
        }
      });
    });

  var modalClose =
    document.getElementById("modalClose");

  if (modalClose) {
    modalClose.addEventListener(
      "click",
      closeCatModal
    );
  }

  if (overlay) {
    overlay.addEventListener(
      "click",
      function (e) {
        if (
          e.target === overlay &&
          licenseValid &&
          !licenseFailed
        ) {
          closeCatModal();
        }
      }
    );
  }

  document.addEventListener(
    "keydown",
    function (e) {

      if (
        e.key === "Escape" &&
        overlay &&
        overlay.classList.contains("open") &&
        licenseValid &&
        !licenseFailed
      ) {
        closeCatModal();
      }
    }
  );

  var modalCta =
    document.getElementById("modalCta");

  if (modalCta) {
    modalCta.addEventListener(
      "click",
      closeCatModal
    );
  }


  /* =========================================================
     NAVIGATION ACTIVE SECTION
     ========================================================= */

  var navLinks =
    document.querySelectorAll(
      "#primaryNav a"
    );

  var spySections = [];

  navLinks.forEach(function (link) {

    var id =
      link
        .getAttribute("href")
        .replace("#", "");

    var sec =
      document.getElementById(id);

    if (sec) {
      spySections.push({
        link: link,
        el: sec
      });
    }
  });

  if (
    "IntersectionObserver" in window &&
    spySections.length
  ) {

    var spyObserver =
      new IntersectionObserver(
        function (entries) {

          if (
            !licenseValid ||
            licenseFailed
          ) {
            return;
          }

          entries.forEach(
            function (entry) {

              var match =
                spySections.find(
                  function (s) {
                    return (
                      s.el ===
                      entry.target
                    );
                  }
                );

              if (!match) {
                return;
              }

              if (
                entry.isIntersecting
              ) {

                navLinks.forEach(
                  function (l) {
                    l.classList.remove(
                      "active"
                    );
                  }
                );

                match.link.classList.add(
                  "active"
                );
              }
            }
          );
        },
        {
          rootMargin:
            "-45% 0px -50% 0px",
          threshold: 0
        }
      );

    spySections.forEach(
      function (s) {
        spyObserver.observe(s.el);
      }
    );
  }


  /* =========================================================
     SCROLL REVEAL ANIMATIONS
     ========================================================= */

  var revealEls =
    document.querySelectorAll(
      ".reveal"
    );

  if (
    "IntersectionObserver" in window &&
    revealEls.length
  ) {

    var revealObserver =
      new IntersectionObserver(
        function (entries) {

          if (
            !licenseValid ||
            licenseFailed
          ) {
            return;
          }

          entries.forEach(
            function (entry) {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "in"
                );

                revealObserver.unobserve(
                  entry.target
                );
              }
            }
          );
        },
        {
          threshold: 0.12,
          rootMargin:
            "0px 0px -60px 0px"
        }
      );

    revealEls.forEach(
      function (el) {
        revealObserver.observe(el);
      }
    );

  } else {

    revealEls.forEach(
      function (el) {

        if (
          licenseValid &&
          !licenseFailed
        ) {
          el.classList.add("in");
        }
      }
    );
  }


  /* =========================================================
     BRAND TICKER
     ========================================================= */

  var brands = [
    "Lenovo",
    "HP",
    "Dell",
    "Microsoft",
    "Cisco",
    "Fortinet",
    "Canon",
    "Epson",
    "TP-Link",
    "QNAP",
    "IBM",
    "Sony",
    "Apple",
    "Seagate",
    "NEC",
    "Xerox",
    "APC",
    "Toshiba",
    "Transcend",
    "Cyberoam",
    "ESET",
    "Acer"
  ];

  var ticker =
    document.getElementById(
      "ticker"
    );

  if (ticker) {

    var html = "";

    for (
      var r = 0;
      r < 2;
      r++
    ) {

      brands.forEach(
        function (b) {
          html +=
            "<span>" +
            b +
            "</span>";
        }
      );
    }

    ticker.innerHTML = html;
  }


  /* =========================================================
     ENQUIRY FORM
     ========================================================= */

  (function () {

    var form =
      document.getElementById(
        "enquiryForm"
      );

    if (!form) {
      console.error(
        "enquiryForm not found on page"
      );

      return;
    }

    var formStatusEl =
      document.getElementById(
        "form-status"
      );

    if (!formStatusEl) {

      formStatusEl =
        document.createElement("p");

      formStatusEl.id =
        "form-status";

      form.appendChild(
        formStatusEl
      );
    }

    form.addEventListener(
      "submit",
      function (e) {

        if (
          !licenseValid ||
          licenseFailed
        ) {
          e.preventDefault();
          e.stopImmediatePropagation();

          return false;
        }

        e.preventDefault();

        var name =
          form.name.value.trim();

        var phone =
          form.phone.value.trim();

        var message =
          form.message.value.trim();

        if (
          !name ||
          !phone ||
          !message
        ) {

          formStatusEl.textContent =
            "Fill in your name, phone and requirement details.";

          formStatusEl.style.color =
            "#E58F8F";

          return;
        }

        formStatusEl.textContent =
          "Sending...";

        formStatusEl.style.color =
          "#8892B0";

        fetch("/send-mail.php", {
          method: "POST",
          body: new FormData(form)
        })
          .then(function (res) {
            return res.json();
          })
          .then(function (data) {

            if (
              !licenseValid ||
              licenseFailed
            ) {
              return;
            }

            if (
              data &&
              data.success
            ) {

              formStatusEl.textContent =
                "Thanks — we received your enquiry and will get back to you shortly.";

              formStatusEl.style.color =
                "#8892B0";

              form.reset();

            } else {

              formStatusEl.textContent =
                "Something went wrong. Please email info@techvyapan.com directly.";

              formStatusEl.style.color =
                "#E58F8F";
            }
          })
          .catch(function () {

            if (
              !licenseValid ||
              licenseFailed
            ) {
              return;
            }

            formStatusEl.textContent =
              "Something went wrong. Please email info@techvyapan.com directly.";

            formStatusEl.style.color =
              "#E58F8F";
          });
      }
    );

  })();


  /* =========================================================
     FINAL SECURITY CHECK
     ========================================================= */

  /*
   * Check once more after initialization.
   */
  setTimeout(function () {

    if (
      licenseValid &&
      !licenseFailed &&
      !isValidCredit()
    ) {

      if (creditObserver) {
        creditObserver.disconnect();
      }

      disableTechVyapanJS(
        "Final developer credit verification failed."
      );
    }

  }, 1000);


})();
