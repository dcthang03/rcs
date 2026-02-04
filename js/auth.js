// auth.js

const SUPABASE_URL = "https://ymtmipkmknnsqleahlmi.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltdG1pcGtta25uc3FsZWFobG1pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwOTU1MjUsImV4cCI6MjA4NTY3MTUyNX0.7pEza-TKBKJ_xqdBu93nLo-PRaHDcDIxW-bjZnrFJxw";

const supabase = supabaseJs.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// LOGIN DEALER
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorBox = document.getElementById("error");

  errorBox.textContent = "";

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    errorBox.textContent = error.message;
    return;
  }

  const user = data.user;

  // LẤY ROLE TỪ BẢNG users
  const { data: userRow, error: roleError } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (roleError || !userRow) {
    await supabase.auth.signOut();
    errorBox.textContent = "Account chưa được gán role";
    return;
  }

  if (userRow.role !== "dealer") {
    await supabase.auth.signOut();
    errorBox.textContent = "Account không phải dealer";
    return;
  }

  // OK → vào app dealer
  window.location.href = "table.html";
}

// LOGOUT
async function logout() {
  await supabase.auth.signOut();
  window.location.href = "dealer.html";
}