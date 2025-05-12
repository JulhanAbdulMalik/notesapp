// Class FooterBar untuk membuat header
class FooterBar extends HTMLElement {
   constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.render();
   }

   render() {
      this.shadowRoot.innerHTML = `
      <style>
				footer {
        	background: darkcyan;
					color: white;
					text-align: center;
					padding: 15px;
					margin-top: 30px;
					font-size: 16px;
					box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
					font-family: 'Poppins', sans-serif;
        }
      </style>
  
      <footer>
		    &copy; 2025 Notes Data - Julhan Abdul Malik
	    </footer>
    `;
   }
}

customElements.define('footer-bar', FooterBar);
