import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { initializeDefaultData, storageUtils, generateId } from '../utils/data.js';

// Initial state
const initialState = {
  user: null, // { id, name, email, role: 'admin' | 'student' }
  users: [], // Array of registered users
  courses: [],
  instructors: [],
  feedbackForms: [],
  feedbackResponses: [],
  currentForm: null,
  adminCodes: [], // Array of { email, code, expiresAt, used: boolean }
  loading: false,
  error: null
};

// Action types
const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_USER: 'SET_USER',
  LOAD_USERS: 'LOAD_USERS',
  REGISTER_USER: 'REGISTER_USER',
  LOAD_DATA: 'LOAD_DATA',
  ADD_FEEDBACK_FORM: 'ADD_FEEDBACK_FORM',
  UPDATE_FEEDBACK_FORM: 'UPDATE_FEEDBACK_FORM',
  DELETE_FEEDBACK_FORM: 'DELETE_FEEDBACK_FORM',
  SUBMIT_FEEDBACK_RESPONSE: 'SUBMIT_FEEDBACK_RESPONSE',
  SET_CURRENT_FORM: 'SET_CURRENT_FORM',
  ADD_COURSE: 'ADD_COURSE',
  UPDATE_COURSE: 'UPDATE_COURSE',
  DELETE_COURSE: 'DELETE_COURSE',
  ADD_INSTRUCTOR: 'ADD_INSTRUCTOR',
  UPDATE_INSTRUCTOR: 'UPDATE_INSTRUCTOR',
  DELETE_INSTRUCTOR: 'DELETE_INSTRUCTOR',
  LOAD_ADMIN_CODES: 'LOAD_ADMIN_CODES',
  ADD_ADMIN_CODE: 'ADD_ADMIN_CODE',
  USE_ADMIN_CODE: 'USE_ADMIN_CODE'
};

// Reducer function
const feedbackReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };

    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    case actionTypes.SET_USER:
      return { ...state, user: action.payload };

    case actionTypes.LOAD_USERS:
      return { ...state, users: action.payload };

    case actionTypes.REGISTER_USER:
      const updatedUsers = [...state.users, action.payload];
      storageUtils.saveToStorage('users', updatedUsers);
      return { ...state, users: updatedUsers };

    case actionTypes.LOAD_DATA:
      return {
        ...state,
        courses: action.payload.courses,
        instructors: action.payload.instructors,
        feedbackForms: action.payload.feedbackForms,
        feedbackResponses: action.payload.feedbackResponses,
        loading: false
      };

    case actionTypes.ADD_FEEDBACK_FORM:
      const newForms = [...state.feedbackForms, action.payload];
      storageUtils.saveToStorage('feedbackForms', newForms);
      return { ...state, feedbackForms: newForms };

    case actionTypes.UPDATE_FEEDBACK_FORM:
      const updatedForms = state.feedbackForms.map(form =>
        form.id === action.payload.id ? action.payload : form
      );
      storageUtils.saveToStorage('feedbackForms', updatedForms);
      return { ...state, feedbackForms: updatedForms };

    case actionTypes.DELETE_FEEDBACK_FORM:
      const filteredForms = state.feedbackForms.filter(form => form.id !== action.payload);
      storageUtils.saveToStorage('feedbackForms', filteredForms);
      return { ...state, feedbackForms: filteredForms };

    case actionTypes.SUBMIT_FEEDBACK_RESPONSE:
      const newResponses = [...state.feedbackResponses, action.payload];
      storageUtils.saveToStorage('feedbackResponses', newResponses);
      return { ...state, feedbackResponses: newResponses };

    case actionTypes.SET_CURRENT_FORM:
      return { ...state, currentForm: action.payload };

    case actionTypes.ADD_COURSE:
      const newCourses = [...state.courses, action.payload];
      storageUtils.saveToStorage('courses', newCourses);
      return { ...state, courses: newCourses };

    case actionTypes.UPDATE_COURSE:
      const updatedCourses = state.courses.map(course =>
        course.id === action.payload.id ? action.payload : course
      );
      storageUtils.saveToStorage('courses', updatedCourses);
      return { ...state, courses: updatedCourses };

    case actionTypes.DELETE_COURSE:
      const filteredCourses = state.courses.filter(course => course.id !== action.payload);
      storageUtils.saveToStorage('courses', filteredCourses);
      return { ...state, courses: filteredCourses };

    case actionTypes.ADD_INSTRUCTOR:
      const newInstructors = [...state.instructors, action.payload];
      storageUtils.saveToStorage('instructors', newInstructors);
      return { ...state, instructors: newInstructors };

    case actionTypes.UPDATE_INSTRUCTOR:
      const updatedInstructors = state.instructors.map(instructor =>
        instructor.id === action.payload.id ? action.payload : instructor
      );
      storageUtils.saveToStorage('instructors', updatedInstructors);
      return { ...state, instructors: updatedInstructors };

    case actionTypes.DELETE_INSTRUCTOR:
      const filteredInstructors = state.instructors.filter(instructor => instructor.id !== action.payload);
      storageUtils.saveToStorage('instructors', filteredInstructors);
      return { ...state, instructors: filteredInstructors };

    case actionTypes.LOAD_ADMIN_CODES:
      return { ...state, adminCodes: action.payload };

    case actionTypes.ADD_ADMIN_CODE:
      const updatedAdminCodes = [...state.adminCodes, action.payload];
      storageUtils.saveToStorage('adminCodes', updatedAdminCodes);
      return { ...state, adminCodes: updatedAdminCodes };

    case actionTypes.USE_ADMIN_CODE:
      const usedAdminCodes = state.adminCodes.map(code =>
        code.id === action.payload ? { ...code, used: true } : code
      );
      storageUtils.saveToStorage('adminCodes', usedAdminCodes);
      return { ...state, adminCodes: usedAdminCodes };

    default:
      return state;
  }
};

// Create context
const FeedbackContext = createContext();

// Provider component
export const FeedbackProvider = ({ children }) => {
  const [state, dispatch] = useReducer(feedbackReducer, initialState);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      dispatch({ type: actionTypes.SET_LOADING, payload: true });
      try {
        // Load users
        const users = storageUtils.loadFromStorage('users', []);
        dispatch({ type: actionTypes.LOAD_USERS, payload: users });

        // Load other data
        const courses = storageUtils.loadFromStorage('courses', []);
        const instructors = storageUtils.loadFromStorage('instructors', []);
        const feedbackForms = storageUtils.loadFromStorage('feedbackForms', []);
        const feedbackResponses = storageUtils.loadFromStorage('feedbackResponses', []);
        const adminCodes = storageUtils.loadFromStorage('adminCodes', []);

        dispatch({
          type: actionTypes.LOAD_DATA,
          payload: { courses, instructors, feedbackForms, feedbackResponses }
        });

        dispatch({ type: actionTypes.LOAD_ADMIN_CODES, payload: adminCodes });

        // Initialize default data if needed
        initializeDefaultData();
      } catch (error) {
        dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
      }
    };

    loadData();
  }, []);

  // Actions
  const actions = {
    setUser: (user) => {
      dispatch({ type: actionTypes.SET_USER, payload: user });
    },

    login: async (email, password, role, adminCode) => {
      const users = storageUtils.loadFromStorage('users', []);
      const user = users.find(u => u.email === email && u.password === password && u.role === role);

      if (!user) {
        throw new Error('Invalid credentials');
      }

      // Additional security for admin login
      if (role === 'admin') {
        if (adminCode !== 'ADMIN2024' && !actions.validateAdminCode(email, adminCode)) {
          throw new Error('Invalid or expired admin verification code');
        }
      }

      return user;
    },

    register: async (userData) => {
      const users = storageUtils.loadFromStorage('users', []);
      const existingUser = users.find(u => u.email === userData.email);

      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Additional validation for admin registration
      if (userData.role === 'admin') {
        if (userData.adminCode !== 'ADMIN2024') {
          throw new Error('Invalid admin verification code');
        }
      }

      const newUser = {
        id: generateId(),
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role
      };

      dispatch({ type: actionTypes.REGISTER_USER, payload: newUser });
      return newUser;
    },

    logout: () => {
      dispatch({ type: actionTypes.SET_USER, payload: null });
    },

    addFeedbackForm: (formData) => {
      const newForm = {
        id: generateId(),
        ...formData,
        createdAt: new Date().toISOString(),
        isActive: true
      };
      dispatch({ type: actionTypes.ADD_FEEDBACK_FORM, payload: newForm });
      return newForm;
    },

    updateFeedbackForm: (formData) => {
      dispatch({ type: actionTypes.UPDATE_FEEDBACK_FORM, payload: formData });
    },

    deleteFeedbackForm: (formId) => {
      dispatch({ type: actionTypes.DELETE_FEEDBACK_FORM, payload: formId });
    },

    submitFeedbackResponse: (responseData) => {
      const newResponse = {
        id: generateId(),
        ...responseData,
        submittedAt: new Date().toISOString()
      };
      dispatch({ type: actionTypes.SUBMIT_FEEDBACK_RESPONSE, payload: newResponse });
      return newResponse;
    },

    setCurrentForm: (form) => {
      dispatch({ type: actionTypes.SET_CURRENT_FORM, payload: form });
    },

    addCourse: (courseData) => {
      const newCourse = {
        id: generateId(),
        ...courseData
      };
      dispatch({ type: actionTypes.ADD_COURSE, payload: newCourse });
      return newCourse;
    },

    updateCourse: (courseData) => {
      dispatch({ type: actionTypes.UPDATE_COURSE, payload: courseData });
    },

    deleteCourse: (courseId) => {
      dispatch({ type: actionTypes.DELETE_COURSE, payload: courseId });
    },

    addInstructor: (instructorData) => {
      const newInstructor = {
        id: generateId(),
        ...instructorData
      };
      dispatch({ type: actionTypes.ADD_INSTRUCTOR, payload: newInstructor });
      return newInstructor;
    },

    updateInstructor: (instructorData) => {
      dispatch({ type: actionTypes.UPDATE_INSTRUCTOR, payload: instructorData });
    },

    deleteInstructor: (instructorId) => {
      dispatch({ type: actionTypes.DELETE_INSTRUCTOR, payload: instructorId });
    },

    updateUser: (userData) => {
      const updatedUsers = state.users.map(user =>
        user.id === userData.id ? { ...user, ...userData } : user
      );
      storageUtils.saveToStorage('users', updatedUsers);
      dispatch({ type: actionTypes.LOAD_USERS, payload: updatedUsers });
    },

    deleteUser: (userId) => {
      const updatedUsers = state.users.filter(user => user.id !== userId);
      storageUtils.saveToStorage('users', updatedUsers);
      dispatch({ type: actionTypes.LOAD_USERS, payload: updatedUsers });
    },

    // Admin code management functions
    generateAdminCode: async (email) => {
      // Generate a 6-digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString();

      // Set expiration to 24 hours from now
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

      const adminCode = {
        id: generateId(),
        email,
        code,
        expiresAt,
        used: false,
        createdAt: new Date().toISOString()
      };

      dispatch({ type: actionTypes.ADD_ADMIN_CODE, payload: adminCode });

      // In a real application, this would send an email
      // For demo purposes, we'll log it to console and show an alert
      console.log(`Admin verification code for ${email}: ${code}`);
      alert(`Demo: Admin verification code sent to ${email}. Check console for code: ${code}`);

      return adminCode;
    },

    validateAdminCode: (email, code) => {
      const adminCodes = storageUtils.loadFromStorage('adminCodes', []);
      const validCode = adminCodes.find(ac =>
        ac.email === email &&
        ac.code === code &&
        !ac.used &&
        new Date(ac.expiresAt) > new Date()
      );

      if (validCode) {
        dispatch({ type: actionTypes.USE_ADMIN_CODE, payload: validCode.id });
        return true;
      }
      return false;
    }
  };

  return (
    <FeedbackContext.Provider value={{ ...state, ...actions }}>
      {children}
    </FeedbackContext.Provider>
  );
};

// Custom hook to use the feedback context
export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
};

export default FeedbackContext;
