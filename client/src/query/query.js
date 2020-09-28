import { gql } from '@apollo/client';
export const NOTES = gql`
      query{
        notes{
          id,
          title,
          description,
          pin,
          tags{
            id,
            name
          }
      }
  }`;

export const ADD_NOTE = gql`
   mutation createNote($noteInput:NoteInput!){
      createNote(
        noteInput:$noteInput
        ){
        id
    }
  }
`;

export const UPDATE_NOTE = gql`
   mutation updateNote($id: Float!, $noteInput:NoteInput!){
      updateNote(id:$id, noteInput:$noteInput){
        id,
        description
      }
  }
`;
export const DELETE_NOTE = gql`
   mutation deleteNote($id: Float!){
      deleteNote(
        id:$id
        )}`;

export const ADD_TAG = gql`
   mutation addTagsToNote($noteId: Float!, $tagInput: TagInput!){
      addTagsToNote(
        noteId:$noteId,
        tagInput:$tagInput
        )}`;

export const REMOVE_TAG = gql`
   mutation removeTagFromNote($noteId: Float!, $tagInput: TagInput!){
      removeTagFromNote(
        noteId:$noteId,
        tagInput:$tagInput
        )}`;