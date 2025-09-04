import { nanoid } from "nanoid";

const STORAGE_KEY = "savedWorkouts";
const SELECTED_WORKOUT_KEY = "selectedWorkout";

// Get all saved workouts from localStorage
export const getSavedWorkouts = () => {
  try {
    const workouts = localStorage.getItem(STORAGE_KEY);
    return workouts ? JSON.parse(workouts) : [];
  } catch (error) {
    console.error("Failed to load saved workouts:", error);
    return [];
  }
};

// Save a workout to localStorage
export const saveWorkout = (workout) => {
  try {
    const workouts = getSavedWorkouts();

    // Ensure workout has an ID
    if (!workout.id) {
      workout.id = nanoid();
    }

    // Check if workout already exists (by ID)
    const existingIndex = workouts.findIndex((w) => w.id === workout.id);

    if (existingIndex >= 0) {
      // Update existing workout
      workouts[existingIndex] = workout;
    } else {
      // Add new workout
      workouts.push(workout);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
    return workout;
  } catch (error) {
    console.error("Failed to save workout:", error);
    throw error;
  }
};

// Delete a workout by ID
export const deleteWorkout = (workoutId) => {
  try {
    const workouts = getSavedWorkouts();
    const updatedWorkouts = workouts.filter((w) => w.id !== workoutId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedWorkouts));

    // Note: Context will handle clearing selection if needed

    return true;
  } catch (error) {
    console.error("Failed to delete workout:", error);
    return false;
  }
};

// Create a new workout from exercises and intervals
export const createWorkout = (title, exercises, intervals) => {
  const workout = {
    id: nanoid(),
    title: title || `Custom Workout ${new Date().toLocaleDateString()}`,
    intervals: intervals,
    exercises: exercises || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return saveWorkout(workout);
};

// Update an existing workout
export const updateWorkout = (workoutId, updates) => {
  try {
    const workouts = getSavedWorkouts();
    const workoutIndex = workouts.findIndex((w) => w.id === workoutId);

    if (workoutIndex >= 0) {
      const updatedWorkout = {
        ...workouts[workoutIndex],
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      workouts[workoutIndex] = updatedWorkout;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));

      return updatedWorkout;
    }

    throw new Error("Workout not found");
  } catch (error) {
    console.error("Failed to update workout:", error);
    throw error;
  }
};

// Get selected workout from localStorage
export const getSelectedWorkout = () => {
  try {
    const selectedWorkout = localStorage.getItem(SELECTED_WORKOUT_KEY);
    return selectedWorkout ? JSON.parse(selectedWorkout) : null;
  } catch (error) {
    console.error("Failed to load selected workout:", error);
    return null;
  }
};

// Save selected workout to localStorage
export const setSelectedWorkout = (workout) => {
  try {
    if (workout) {
      localStorage.setItem(SELECTED_WORKOUT_KEY, JSON.stringify(workout));
    } else {
      localStorage.removeItem(SELECTED_WORKOUT_KEY);
    }
  } catch (error) {
    console.error("Failed to save selected workout:", error);
  }
};

// Import workout from JSON
export const importWorkoutFromJSON = (jsonString) => {
  try {
    const workout = JSON.parse(jsonString);

    // Validate required fields
    if (!workout.title || !Array.isArray(workout.exercises)) {
      throw new Error("Invalid workout format");
    }

    // Ensure workout has proper structure
    const normalizedWorkout = {
      id: workout.id || nanoid(),
      title: workout.title,
      exercises: workout.exercises,
      intervals: workout.intervals,
      longbreak: workout.longbreak || workout.longBreak || 75,
      createdAt: workout.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return saveWorkout(normalizedWorkout);
  } catch (error) {
    console.error("Failed to import workout:", error);
    throw new Error("Invalid JSON format or workout structure");
  }
};

// Export workout to JSON string
export const exportWorkoutToJSON = (workoutId) => {
  try {
    const workouts = getSavedWorkouts();
    const workout = workouts.find((w) => w.id === workoutId);

    if (!workout) {
      throw new Error("Workout not found");
    }

    return JSON.stringify(workout, null, 2);
  } catch (error) {
    console.error("Failed to export workout:", error);
    throw error;
  }
};
