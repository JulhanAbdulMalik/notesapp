// Class AppBar untuk membuat header
class AppBar extends HTMLElement {
   constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.render();
   }

   render() {
      this.shadowRoot.innerHTML = `
    	<style>
        :host {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }
					
        .header {
          background: darkcyan;
          color: #fff;
          text-align: center;

          padding: 20px;
          font-size: 28px;
          font-weight: bold;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
      </style>

      <div class="header">Notes Data</div>
    `;
   }
}

customElements.define('app-bar', AppBar);
