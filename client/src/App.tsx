import { BrowserRouter as Router, Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';

import './App.css';


import { CheckEmail } from './components/CheckEmail';
import { ForgotPassword } from './components/ForgotPassword';
import { Homepage } from './components/Homepage';
import { Login } from './components/Login';
import { NewPassword } from './components/NewPassword';
import { Signup } from './components/Signup';
import { ProfilePage } from './components/ProfilePage';
import { AddRecipe } from './components/AddRecipe';
import { RateReview } from './components/RateReview';
import { SaveEditPage } from './components/SaveEditPage';
import { RateAndReview } from './components/Rate-Review';
import { ReviewSubmitted } from './components/ReviewSubmited';
import { Recipes } from './components/Recipes';
import { RecipeDetails } from './components/RecipeDetails';
import { Favorites } from './components/Favorites';


function App() {
  

  const accessToken = localStorage.getItem('accessToken');

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path='/checkemail' element={<CheckEmail />} />
        <Route path='/newpassword' element={<NewPassword />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        {/* Private routes */}
        {accessToken ? (
            // Private routes
            <>
              <Route path='/homepage' element={<Homepage />} />
              <Route path="/recipes/:recipeId" element={<RecipeDetails/>} />
              <Route path='/recipepage' element={<Recipes />}/>
              <Route path='/favorites' element={<Favorites />}/>


              <Route path='/profilepage' element={<ProfilePage />} />
              <Route path='/addrecipe' element={<AddRecipe />} />
              <Route path='/rateandreview' element={<RateReview />} />
              <Route path="/review/:recipeId" element={<RateAndReview />} />
              <Route path='/review/submitted' element={<ReviewSubmitted/>}/>
              <Route path='/save-edit' element={<SaveEditPage />} />
            </>
          ) : (
           // Redirect to login page if not authenticated
          <Route path='*' element={<Navigate to="/login" />} />
          )}
      </Routes>
   </BrowserRouter>
  );
}

export default App;
