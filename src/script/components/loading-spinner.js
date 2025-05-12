class LoadingSpinner extends HTMLElement {
   constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });

      shadow.innerHTML = `
        <style>
          .spinner {
            width: 50px;
            height: 50px;
            border: 5px solid #ccc;
            border-top-color: darkcyan;
            border-radius: 50%;
            animation: spin 0.5s linear infinite;
            margin: auto;
          }
  
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
  
          .wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100px;
          }
        </style>
  
        <div class="wrapper">
          <div class="spinner"></div>
        </div>
      `;
   }
}

customElements.define('loading-spinner', LoadingSpinner);
