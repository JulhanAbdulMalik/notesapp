import {
   renderAllNotes,
   renderAllArchivedNotes,
   showLoading,
   hideLoading,
   // sleep,
   showToast,
} from '../../utils/utils.js';
import { animate } from '@motionone/dom';

function notesDataApi() {
   // Base API URL
   const BASE_URL = 'https://notes-api.dicoding.dev/v2';

   const loadingSpinner = document.querySelector('loading-spinner');

   async function getNotes() {
      showLoading(loadingSpinner);

      try {
         const response = await fetch(`${BASE_URL}/notes`);
         const responseJson = await response.json();

         renderAllNotes(responseJson.data);
      } catch (error) {
         showToast('error', 'Note not found!');
      } finally {
         hideLoading(loadingSpinner);
      }
   }

   async function getArchivedNotes() {
      showLoading(loadingSpinner);

      try {
         const response = await fetch(`${BASE_URL}/notes/archived`);
         const responseJson = await response.json();

         renderAllArchivedNotes(responseJson.data);
      } catch (error) {
         showToast('error', 'Note not found!');
      } finally {
         hideLoading(loadingSpinner);
      }
   }

   async function insertNote(notes) {
      try {
         const response = await fetch(`${BASE_URL}/notes`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(notes),
         });

         const responseJson = await response.json();
         showToast('success', responseJson.message);

         getNotes();
         getArchivedNotes();
      } catch (error) {
         showToast('error', 'Note failed to save!');
      }
   }

   async function archiveNote(noteId) {
      try {
         const response = await fetch(`${BASE_URL}/notes/${noteId}/archive`, {
            method: 'POST',
         });

         const responseJson = await response.json();
         showToast('success', responseJson.message);

         getNotes();
         getArchivedNotes();
      } catch (error) {
         showToast('error', 'Note failed to archive!');
      }
   }

   async function unarchiveNote(noteId) {
      try {
         const response = await fetch(`${BASE_URL}/notes/${noteId}/unarchive`, {
            method: 'POST',
         });

         const responseJson = await response.json();
         showToast('success', responseJson.message);

         getNotes();
         getArchivedNotes();
      } catch (error) {
         showToast('error', 'Note transfer failed!');
      }
   }

   async function deleteNote(noteId) {
      try {
         const response = await fetch(`${BASE_URL}/notes/${noteId}`, {
            method: 'DELETE',
         });

         const responseJson = await response.json();
         showToast('success', responseJson.message);

         getNotes();
         getArchivedNotes();
      } catch (error) {
         showToast('error', 'Note deletion failed!');
      }
   }

   document.addEventListener('DOMContentLoaded', () => {
      // Event untuk tombol Tambah
      const AddNote = document.querySelector('add-note');
      AddNote.addEventListener('note-added', (event) => {
         const noteData = event.detail;

         insertNote(noteData);
      });

      // Event Delegation untuk tombol Delete
      document.addEventListener('click', (event) => {
         if (event.target.classList.contains('button-delete')) {
            const noteId = event.target.id;
            const noteCard = event.target.closest('.note');

            // Animasi fade out sebelum hapus
            animate(
               noteCard,
               { opacity: 0, transform: 'scale(0.95)' },
               { duration: 0.3, easing: 'ease-in-out' },
            ).finished.then(() => {
               deleteNote(noteId); // Setelah animasi selesai, baru hapus
            });
         }
      });

      // Event Delegation untuk tombol Archive or Unarchive
      document.addEventListener('click', (event) => {
         if (event.target.classList.contains('button-move')) {
            const noteId = event.target.id;
            const condition = event.target.innerText == 'Archive';
            const noteCard = event.target.closest('.note');

            animate(
               noteCard,
               { opacity: 0, transform: 'scale(0.95)' },
               { duration: 0.3, easing: 'ease-in-out' },
            ).finished.then(() => {
               if (condition) {
                  archiveNote(noteId);
               } else {
                  unarchiveNote(noteId);
               }
            });
         }
      });

      getNotes();
      getArchivedNotes();
   });
}

export default notesDataApi;
