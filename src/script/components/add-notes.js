// Class AddNote untuk menambahkan note baru
class AddNote extends HTMLElement {
   constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.render();
   }

   render() {
      this.shadowRoot.innerHTML = `
      <style>
        .add-note-container {
          width: 70%;
          max-width: 1200px;
          margin: 30px auto;
          padding: 20px;
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        }

        .add-note-container form {
          display: grid;
          gap: 10px;
        }

        input, textarea, button {
          width: 98%;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 15px;
          padding: 10px;
          font-family: 'Poppins', sans-serif;
        }

        button {
          background: darkcyan;
          color: white;
          border: none;
          cursor: pointer;
          transition: background 0.3s ease;
          font-weight: 500;
        }
        
        button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        button:hover:not(:disabled) {
          opacity: 0.8;
        }

        .error {
          color: red;
          font-size: 12px;
          display: none;
          opacity: 0.7;
        }

        .error.active {
          display: block;
        }

      </style>
          
      <div class="add-note-container">
        <form id="noteForm">
          <input type="text" id="title" placeholder="Note Title">
          <span id="titleError" class="error">Judul harus minimal 3 karakter</span>

          <textarea id="body" placeholder="Note Body" rows="3"></textarea>
          <span id="bodyError" class="error">Body harus minimal 5 karakter</span>

          <button id="submitBtn" disabled>Add Note</button>
        </form>
      </div>
    `;

      this.addValidation();
   }

   addValidation() {
      const form = this.shadowRoot.querySelector('#noteForm');
      const titleInput = this.shadowRoot.querySelector('#title');
      const bodyInput = this.shadowRoot.querySelector('#body');
      const titleError = this.shadowRoot.querySelector('#titleError');
      const bodyError = this.shadowRoot.querySelector('#bodyError');
      const submitBtn = this.shadowRoot.querySelector('#submitBtn');

      const validateForm = () => {
         let isValid = true;

         if (titleInput.value.length < 3) {
            titleError.classList.add('active');
            isValid = false;
         } else {
            titleError.classList.remove('active');
         }

         if (bodyInput.value.length < 5) {
            bodyError.classList.add('active');
            isValid = false;
         } else {
            bodyError.classList.remove('active');
         }

         submitBtn.disabled = !isValid;
      };

      titleInput.addEventListener('input', validateForm);
      bodyInput.addEventListener('input', validateForm);

      form.addEventListener('submit', (event) => {
         event.preventDefault();
         if (submitBtn.disabled) return;

         this.dispatchEvent(
            new CustomEvent('note-added', {
               detail: {
                  title: titleInput.value,
                  body: bodyInput.value,
               },
               bubbles: true,
               composed: true,
            }),
         );

         form.reset();
         submitBtn.disabled = true;
      });
   }
}

customElements.define('add-note', AddNote);
