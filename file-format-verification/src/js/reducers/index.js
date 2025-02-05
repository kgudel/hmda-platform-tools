import { combineReducers } from 'redux'
import {
  SELECT_FILE,
  UPDATE_STATUS,
  BEGIN_PARSE,
  END_PARSE,
  SET_PAGE,
  ERRORS_PER_PAGE,
  PAGINATION_FADE_IN,
  PAGINATION_FADE_OUT
} from '../constants'

const defaultUpload = {
  uploading: false,
  file: null,
  errors: []
}

const defaultStatus = {
  code: null,
  message: ''
}

const defaultParseErrors = {
  isParsing: false,
  parsed: false,
  transmittalSheetErrors: [],
  larErrors: []
}

const defaultPagination = {
  page: 1,
  previousPage: 1,
  total: 1,
  fade: 0
}

//empty action logger, temporary / for debugging
export const empty = (state = {}, action) => {
  return state
}

/*
 * Maintain data on the current upload
 */
export const upload = (state = defaultUpload, action) => {
  switch (action.type) {
    case SELECT_FILE:
      return {
        ...state,
        file: action.file,
        errors: action.errors
      }
    default:
      return state
  }
}

export const status = (state = defaultStatus, action) => {
  switch (action.type) {
    case UPDATE_STATUS:
      return action.status
    default:
      return state
  }
}

export const parseErrors = (state = defaultParseErrors, action) => {
  switch (action.type) {
    case BEGIN_PARSE:
      return {
        ...state,
        isParsing: true
      }

    case END_PARSE:
      return {
        parsed: true,
        isParsing: false,
        transmittalSheetErrors: action.transmittalSheetErrors,
        larErrors: action.larErrors
      }

    default:
      return state
  }
}

export const pagination = (state = defaultPagination, action) => {
  switch (action.type) {
    case SET_PAGE:
      return {
        ...state,
        page: action.page,
        previousPage: state.page
      }
    case END_PARSE:
      return {
        page: 1,
        total: ((action.larErrors.length / ERRORS_PER_PAGE) >> 0) + 1,
        fade: 0
      }
    case PAGINATION_FADE_IN:
      return {
        ...state,
        fade: 0
      }
    case PAGINATION_FADE_OUT:
      return {
        ...state,
        fade: 1
      }
    default:
      return state
  }
}

export default combineReducers({
  empty,
  upload,
  status,
  parseErrors,
  pagination
})
