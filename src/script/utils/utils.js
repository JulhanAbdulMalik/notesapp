import Swal from 'sweetalert2';
import { animate } from '@motionone/dom';

// Function renderAllNotes untuk menampilkan semua note
const renderAllNotes = (notes) => {
   const notesList = document.querySelector('#notesList');
   notesList.innerHTML = '';

   notes.forEach((note) => {
      notesList.innerHTML += createNoteItemElement(note);
   });

   // Animasi setelah semua note dirender
   document.querySelectorAll('.note').forEach((el, i) => {
      animate(
         el,
         {
            opacity: [0, 1],
            transform: ['translateY(20px)', 'translateY(0)'],
         },
         {
            duration: 0.3,
            delay: i * 0.05,
            easing: 'ease-in-out',
         },
      );
   });
};

const renderAllArchivedNotes = (notes) => {
   const notesListArchived = document.querySelector('#notesListArchived');
   notesListArchived.innerHTML = '';

   notes.forEach((note) => {
      notesListArchived.innerHTML += createNoteItemElement(note);
   });

   // Animasi setelah semua note dirender
   document.querySelectorAll('.note').forEach((el, i) => {
      animate(
         el,
         {
            opacity: [0, 1],
            transform: ['translateY(20px)', 'translateY(0)'],
         },
         {
            duration: 0.4,
            delay: i * 0.05,
            easing: 'ease-in-out',
         },
      );
   });
};

// Function createNoteItemElement untuk membuat elemen note
const createNoteItemElement = ({ id, title, body, createdAt, archived }) => {
   return `
    <style>
      .note {
        background: white;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: 0.3s;
        margin-bottom: 10px;
      }

      .note:hover {
        transform: translateY(-5px);
      }

      .note h3 {
        margin-bottom: 10px;
        color: darkcyan;
        font-weight: 600;
      }

      .note p {
        color: #333;
        font-size: 14px;
      }

      .note small {
        font-size: 12px;
        color: #999;
      }

      .button {
        margin-top: 10px;
        padding: 5px 10px;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
      }
      
      .button:hover {
        opacity: 0.8;
      }
      
      .button-delete {
        background: rgb(246, 118, 118);
      }
      
      .button-move {
        background: rgb(23, 176, 176);
      }
    </style>

    <div data-noteid="${id}" class="note">
      <h3>${title}</h3>
      <p>${body}</p>
      <small>Created at: ${new Date(createdAt).toLocaleString()}</small><br>
      <small>Status: ${archived ? 'Archived' : 'Active'}</small>
      <br>
      <button type="button" class="button button-delete" id="${id}">Delete</button>
      <button type="button" class="button button-move" id="${id}">
      ${archived ? 'Unarchive' : 'Archive'}
      </button>
    </div>
  `;
};

const showLoading = (element) => {
   element.style.display = 'block';
};

const hideLoading = (element) => {
   element.style.display = 'none';
};

const toast = Swal.mixin({
   toast: true,
   position: 'top-end',
   showConfirmButton: false,
   timer: 2000,
   timerProgressBar: true,
   didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
   },
});

const showToast = (icon = 'success', title = 'Berhasil') => {
   toast.fire({ icon, title });
};

// Hanya simulasi saja!
// Ini hanya digunakan untuk menambah waktu penyelesaian dari proses asynchronous.
// export function sleep(response = null) {
//   // Proses async ini seharusnya tidak memiliki kemungkinan gagal.
//   return new Promise((resolve) =>
//     setTimeout(() => {
//       resolve(response);
//     }, 2000)
//   );
// }

export {
   renderAllNotes,
   renderAllArchivedNotes,
   showLoading,
   hideLoading,
   // sleep,
   showToast,
};
