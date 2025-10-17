import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/register" />
          <Route path="/login" />
          <Route path="/forgot-password" />
          <Route path="/verify-otp" />
          <Route path="/verify-otp-success" />
          <Route path="/reset-password" />
          <Route path="/reset-password-success" />
        </Route>

        <Route>
          <Route path="/" />
          <Route path="/catalog" />
          <Route path="/catalog/:slug" />
        </Route>

        <Route path="/profile">
          <Route path="/account" />
          <Route path="/wishlist" />
          <Route path="/settings" />
          <Route path="/reviews" />
          <Route path="/orders" />
          <Route path="/shipping-address" />
          <Route path="/payment" />
        </Route>

        <Route>
          <Route path="/privacy-and-policy" />
          <Route path="/terms-of-use" />
          <Route path="/settings" />
          <Route path="/reviews" />
        </Route>

        <Route>
          <Route path="*" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
