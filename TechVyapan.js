(function () {
  "use strict";

  /* =========================================================
     TECHVYAPAN
     DEVELOPER CREDIT / SITE PROTECTION

     Developer:
     Suraj Dev

     Website:
     https://www.surajdev.com/

     NOTE:
     This is a client-side protection mechanism.
     It can deter normal removal of the developer credit,
     but it is not a tamper-proof licensing system because
     browser-side JavaScript can be inspected or modified.
     ========================================================= */


  /* =========================================================
     CONFIGURATION
     ========================================================= */

  var CREDIT_SELECTOR =
    'span.credit[data-dev-credit="suraj-dev"]';

  var REQUIRED_NAME = "suraj dev";

  var REQUIRED_URL =
    "https://www.surajdev.com/";

  var REQUIRED_DOMAIN =
    "surajdev.com";


  /* =========================================================
     LICENSE STATE
     ========================================================= */

  var licenseValid = false;
  var licenseFailed = false;
  var creditObserver = null;


  /* =========================================================
     UTILITY
     ========================================================= */

  function normalizeText(value) {
    return String(value || "")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }


  /* =========================================================
     CREDIT VALIDATION
     ========================================================= */

  function isValidCredit() {

    var credit =
      document.querySelector(CREDIT_SELECTOR);

    /*
     * Credit must exist.
     */
    if (!credit) {
      return false;
    }


    /*
     * Credit must be inside footer.
     */
    var footer =
      credit.closest("footer");

    if (!footer) {
      return false;
    }


    /*
     * Verify developer credit marker.
     */
    if (
      credit.getAttribute("data-dev-credit") !==
      "suraj-dev"
    ) {
      return false;
    }


    /*
     * Verify developer name attribute.
     */
    if (
      credit.getAttribute("data-dev-name") !==
      "Suraj Dev"
    ) {
      return false;
    }


    /*
     * Verify developer URL attribute.
     */
    if (
      credit.getAttribute("data-dev-url") !==
      REQUIRED_URL
    ) {
      return false;
    }


    /*
     * Verify visible credit text.
     */
    var creditText =
      normalizeText(credit.textContent);

    if (
      creditText.indexOf("built by") === -1
    ) {
      return false;
    }

    if (
      creditText.indexOf(REQUIRED_NAME) === -1
    ) {
      return false;
    }


    /*
     * Verify developer link.
     */
    var link =
      credit.querySelector("a");

    if (!link) {
      return false;
    }


    /*
     * Verify href.
     */
    var href =
      link.getAttribute("href") || "";

    href = href.trim();

    if (
      href !== REQUIRED_URL
    ) {
      return false;
    }


    /*
     * Verify domain as an additional check.
     */
    if (
      normalizeText(href).indexOf(
        REQUIRED_DOMAIN
      ) === -1
    ) {
      return false;
    }


    /*
     * Verify link text.
     */
    var linkText =
      normalizeText(link.textContent);

    if (
      linkText !== REQUIRED_NAME
    ) {
      return false;
    }


    return true;
  }


  /* =========================================================
     SITE LOCK
     ========================================================= */

  function disableTechVyapanJS(reason) {

    /*
     * Prevent repeated execution.
     */
    if (licenseFailed) {
      return;
    }

    licenseFailed = true;
    licenseValid = false;


    /*
     * Stop monitoring because the page is going
     * to be replaced.
     */
    if (creditObserver) {
      creditObserver.disconnect();
      creditObserver = null;
    }


    /*
     * Console information.
     */
    console.warn(
      "TechVyapan: Developer credit verification failed."
    );

    if (reason) {
      console.warn(
        "Reason:",
        reason
      );
    }


    /*
     * Mark website as invalid.
     */
    document.documentElement.setAttribute(
      "data-techvyapan-license",
      "invalid"
    );


    /*
     * Lock scrolling.
     */
    document.documentElement.style.overflow =
      "hidden";


    /*
     * Completely replace page content.
     */
    if (document.body) {

      document.body.innerHTML = "";

      document.body.style.margin =
        "0";

      document.body.style.padding =
        "0";

      document.body.style.width =
        "100%";

      document.body.style.minHeight =
        "100vh";

      document.body.style.background =
        "#050817";

      document.body.style.color =
        "#ffffff";

      document.body.style.display =
        "flex";

      document.body.style.alignItems =
        "center";

      document.body.style.justifyContent =
        "center";

      document.body.style.fontFamily =
        "Arial, Helvetica, sans-serif";


      /*
       * Create locked screen.
       */
      var lockedScreen =
        document.createElement("div");


      lockedScreen.style.width =
        "100%";

      lockedScreen.style.maxWidth =
        "650px";

      lockedScreen.style.boxSizing =
        "border-box";

      lockedScreen.style.padding =
        "50px 30px";

      lockedScreen.style.textAlign =
        "center";


      /*
       * Add locked screen content.
       */
      lockedScreen.innerHTML =

        '<div style="' +
          'font-size:48px;' +
          'line-height:1;' +
          'margin-bottom:24px;' +
        '">' +
          '⚠️' +
        '</div>' +

        '<h1 style="' +
          'margin:0 0 16px;' +
          'font-size:30px;' +
          'font-weight:700;' +
          'color:#ffffff;' +
        '">' +
          'Website Unavailable' +
        '</h1>' +

        '<p style="' +
          'margin:0 auto 24px;' +
          'max-width:520px;' +
          'font-size:16px;' +
          'line-height:1.7;' +
          'color:#9ca3af;' +
        '">' +
          'This website requires the original developer ' +
          'attribution to remain intact.' +
        '</p>' +

        '<p style="' +
          'margin:0;' +
          'font-size:15px;' +
          'color:#ffffff;' +
        '">' +
          'Built by ' +

          '<a ' +
            'href="https://www.surajdev.com/" ' +
            'target="_blank" ' +
            'rel="noopener noreferrer" ' +
            'style="' +
              'color:#8b5cf6;' +
              'text-decoration:none;' +
              'font-weight:700;' +
            '"' +
          '>' +
            'Suraj Dev' +
          '</a>' +

        '</p>';


      document.body.appendChild(
        lockedScreen
      );
    }
  }


  /* =========================================================
     INITIAL CREDIT CHECK
     ========================================================= */

  if (!isValidCredit()) {

    disableTechVyapanJS(
      "Required Suraj Dev developer credit was not found."
    );

    return;
  }


  /*
   * Credit is valid.
   */
  licenseValid = true;


  /*
   * Mark website as valid.
   */
  document.documentElement.setAttribute(
    "data-techvyapan-license",
    "valid"
  );


  /* =========================================================
     CONTINUOUS CREDIT MONITORING
     ========================================================= */

  if (
    "MutationObserver" in window
  ) {

    creditObserver =
      new MutationObserver(
        function () {

          /*
           * Do nothing if already invalid.
           */
          if (
            licenseFailed
          ) {
            return;
          }


          /*
           * Re-check developer credit.
           */
          if (
            !isValidCredit()
          ) {

            disableTechVyapanJS(
              "Developer credit was removed or modified."
            );
          }
        }
      );


    /*
     * Monitor the complete document.
     *
     * This detects:
     * - removing the footer
     * - removing the credit
     * - changing credit text
     * - changing attributes
     * - changing the developer link
     */
    creditObserver.observe(
      document.documentElement,
      {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true
      }
    );
  }


  /* =========================================================
     PRELOADER
     ========================================================= */

  (function () {

    var start =
      Date.now();

    var minShow =
      500;


    function hidePreloader() {

      if (
        !licenseValid ||
        licenseFailed
      ) {
        return;
      }


      var elapsed =
        Date.now() - start;

      var wait =
        Math.max(
          minShow - elapsed,
          0
        );


      setTimeout(
        function () {

          if (
            !licenseValid ||
            licenseFailed
          ) {
            return;
          }


          var pre =
            document.getElementById(
              "preloader"
            );


          document.body.classList.remove(
            "loading"
          );


          if (pre) {

            pre.classList.add(
              "hide"
            );


            setTimeout(
              function () {

                if (
                  pre &&
                  pre.parentNode
                ) {
                  pre.remove();
                }

              },
              450
            );
          }

        },
        wait
      );
    }


    if (
      document.readyState ===
      "complete"
    ) {

      hidePreloader();

    } else {

      window.addEventListener(
        "load",
        hidePreloader
      );


      setTimeout(
        hidePreloader,
        3000
      );
    }

  })();


  /* =========================================================
     MOBILE NAVIGATION
     ========================================================= */

  var navtoggle =
    document.getElementById(
      "navtoggle"
    );

  var mobilenav =
    document.getElementById(
      "mobilenav"
    );


  if (
    navtoggle &&
    mobilenav
  ) {

    navtoggle.addEventListener(
      "click",
      function () {

        if (
          !licenseValid ||
          licenseFailed
        ) {
          return;
        }


        var isOpen =
          mobilenav.classList.toggle(
            "open"
          );


        navtoggle.setAttribute(
          "aria-expanded",
          isOpen
            ? "true"
            : "false"
        );


        navtoggle.textContent =
          isOpen
            ? "CLOSE"
            : "MENU";
      }
    );


    document
      .querySelectorAll(
        "#mobilenav a"
      )
      .forEach(
        function (a) {

          a.addEventListener(
            "click",
            function () {

              if (
                !licenseValid ||
                licenseFailed
              ) {
                return;
              }


              mobilenav.classList.remove(
                "open"
              );


              navtoggle.textContent =
                "MENU";


              navtoggle.setAttribute(
                "aria-expanded",
                "false"
              );
            }
          );

        }
      );
  }


  /* =========================================================
     CATEGORY DATA
     ========================================================= */

  var catData = {

    "01": {
      title:
        "IT Products &amp; Solutions",

      icon:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
          '<rect x="3" y="4" width="18" height="12" rx="1"/>' +
          '<path d="M1 19h22l-2-3H3z"/>' +
        '</svg>',

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
      title:
        "Networking",

      icon:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
          '<path d="M5 8.5a10 10 0 0 1 14 0"/>' +
          '<path d="M7.8 11.3a6 6 0 0 1 8.4 0"/>' +
          '<path d="M10.6 14a2.2 2.2 0 0 1 2.8 0"/>' +
        '</svg>',

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
      title:
        "Security &amp; Surveillance",

      icon:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
          '<rect x="3" y="8" width="13" height="9" rx="2"/>' +
          '<circle cx="9.5" cy="12.5" r="2.4"/>' +
          '<path d="M16 10.5l5-2.5v9l-5-2.5"/>' +
        '</svg>',

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
      title:
        "Software &amp; Licensing",

      icon:
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
          '<rect x="3" y="4" width="18" height="16" rx="1.5"/>' +
          '<path d="M3 8h18"/>' +
          '<path d="M6 12h9M6 15h6"/>' +
        '</svg>',

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
    document.getElementById(
      "catModalOverlay"
    );

  var modalTitle =
    document.getElementById(
      "modalTitle"
    );

  var modalIcon =
    document.getElementById(
      "modalIcon"
    );

  var modalDesc =
    document.getElementById(
      "modalDesc"
    );

  var modalItems =
    document.getElementById(
      "modalItems"
    );

  var lastFocused =
    null;


  function openCatModal(code) {

    if (
      !licenseValid ||
      licenseFailed
    ) {
      return;
    }


    var d =
      catData[code];


    if (!d) {
      return;
    }


    if (
      !overlay ||
      !modalTitle ||
      !modalIcon ||
      !modalDesc ||
      !modalItems
    ) {
      return;
    }


    modalTitle.innerHTML =
      d.title;


    modalIcon.innerHTML =
      d.icon;


    modalDesc.textContent =
      d.desc;


    modalItems.innerHTML =
      "";


    d.items.forEach(
      function (item) {

        var li =
          document.createElement(
            "li"
          );

        li.innerHTML =
          item;

        modalItems.appendChild(
          li
        );
      }
    );


    lastFocused =
      document.activeElement;


    overlay.classList.add(
      "open"
    );


    var closeButton =
      document.getElementById(
        "modalClose"
      );


    if (closeButton) {
      closeButton.focus();
    }
  }


  function closeCatModal() {

    if (
      !licenseValid ||
      licenseFailed
    ) {
      return;
    }


    if (!overlay) {
      return;
    }


    overlay.classList.remove(
      "open"
    );


    if (
      lastFocused &&
      typeof lastFocused.focus ===
        "function"
    ) {
      lastFocused.focus();
    }
  }


  document
    .querySelectorAll(
      ".cat-cell"
    )
    .forEach(
      function (cell) {

        cell.addEventListener(
          "click",
          function () {

            if (
              !licenseValid ||
              licenseFailed
            ) {
              return;
            }


            openCatModal(
              cell.getAttribute(
                "data-cat"
              )
            );
          }
        );


        cell.addEventListener(
          "keydown",
          function (e) {

            if (
              !licenseValid ||
              licenseFailed
            ) {
              return;
            }


            if (
              e.key === "Enter" ||
              e.key === " "
            ) {

              e.preventDefault();


              openCatModal(
                cell.getAttribute(
                  "data-cat"
                )
              );
            }
          }
        );

      }
    );


  var modalClose =
    document.getElementById(
      "modalClose"
    );


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
        overlay.classList.contains(
          "open"
        ) &&
        licenseValid &&
        !licenseFailed
      ) {

        closeCatModal();
      }

    }
  );


  var modalCta =
    document.getElementById(
      "modalCta"
    );


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


  navLinks.forEach(
    function (link) {

      var href =
        link.getAttribute(
          "href"
        );


      if (!href) {
        return;
      }


      var id =
        href.replace(
          "#",
          ""
        );


      var sec =
        document.getElementById(
          id
        );


      if (sec) {

        spySections.push({
          link: link,
          el: sec
        });
      }

    }
  );


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

        spyObserver.observe(
          s.el
        );
      }
    );
  }


  /* =========================================================
     SCROLL REVEAL
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

        revealObserver.observe(
          el
        );
      }
    );

  } else {

    revealEls.forEach(
      function (el) {

        if (
          licenseValid &&
          !licenseFailed
        ) {

          el.classList.add(
            "in"
          );
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


    ticker.innerHTML =
      html;
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
        document.createElement(
          "p"
        );


      formStatusEl.id =
        "form-status";


      form.appendChild(
        formStatusEl
      );
    }


    form.addEventListener(
      "submit",
      function (e) {

        /*
         * Check license again before
         * processing enquiry.
         */
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


        fetch(
          "/send-mail.php",
          {
            method: "POST",

            body:
              new FormData(form)
          }
        )

          .then(
            function (res) {
              return res.json();
            }
          )

          .then(
            function (data) {

              /*
               * Check credit again before
               * accepting response.
               */
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

            }
          )

          .catch(
            function () {

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
            }
          );

      }
    );

  })();


  /* =========================================================
     FINAL VERIFICATION
     ========================================================= */

  /*
   * Perform another check shortly after initialization.
   * This catches situations where the footer is changed
   * immediately after the script starts.
   */

  setTimeout(
    function () {

      if (
        licenseValid &&
        !licenseFailed &&
        !isValidCredit()
      ) {

        disableTechVyapanJS(
          "Final developer credit verification failed."
        );
      }

    },
    1000
  );


  /* =========================================================
     PERIODIC BACKUP CHECK
     ========================================================= */

  /*
   * MutationObserver handles DOM changes.
   * This periodic check is an additional safety layer.
   */

  setInterval(
    function () {

      if (
        licenseFailed
      ) {
        return;
      }


      if (
        !isValidCredit()
      ) {

        disableTechVyapanJS(
          "Periodic developer credit verification failed."
        );
      }

    },
    5000
  );


})();
