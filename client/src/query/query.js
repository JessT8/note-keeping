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