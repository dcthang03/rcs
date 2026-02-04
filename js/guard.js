
// guard.js

(async () => {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    window.location.href = "dealer.html";
    return;
  }

  const { data: userRow } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!userRow || userRow.role !== "dealer") {
    await supabase.auth.signOut();
    window.location.href = "dealer.html";
  }
})();