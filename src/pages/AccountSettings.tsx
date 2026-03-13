import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Camera, Trash2, AlertTriangle, User, Mail, Lock, Shield } from "lucide-react";
import { useAuth } from "@/lib/authStore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const AccountSettings = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Avatar
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarUploading, setAvatarUploading] = useState(false);

  // Email
  const [newEmail, setNewEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailSuccess, setEmailSuccess] = useState("");
  const [emailSubmitting, setEmailSubmitting] = useState(false);

  // Password
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passError, setPassError] = useState("");
  const [passSuccess, setPassSuccess] = useState("");
  const [passSubmitting, setPassSubmitting] = useState(false);

  // Delete account
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Load avatar from localStorage
  useEffect(() => {
    const storedAvatar = localStorage.getItem(`netflix_avatar_${user?.email}`);
    if (storedAvatar) {
      setAvatarUrl(storedAvatar);
    }
  }, [user]);

  const handleAvatarUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Simulate upload delay
    setAvatarUploading(true);
    
    // Create a temporary URL for the uploaded image
    const reader = new FileReader();
    reader.onload = (event) => {
      const url = event.target?.result as string;
      setAvatarUrl(url);
      // Store in localStorage for persistence
      if (user) {
        localStorage.setItem(`netflix_avatar_${user.email}`, url);
        // Dispatch custom event to notify other components
        window.dispatchEvent(new StorageEvent('storage', {
          key: `netflix_avatar_${user.email}`,
          newValue: url,
          oldValue: null
        }));
      }
      setAvatarUploading(false);
    };
    reader.readAsDataURL(file);
  }, [user]);

  const handleEmailUpdate = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setEmailSuccess("");
    setEmailSubmitting(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock email validation
    if (!newEmail.includes("@")) {
      setEmailError("Please enter a valid email address");
      setEmailSubmitting(false);
      return;
    }
    
    // In a real app, this would update the user's email
    setEmailSuccess("Email updated successfully (mock)");
    setNewEmail("");
    setEmailSubmitting(false);
  }, [newEmail]);

  const handlePasswordUpdate = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError("");
    setPassSuccess("");
    
    if (newPassword !== confirmPassword) { 
      setPassError("Passwords do not match"); 
      return; 
    }
    if (newPassword.length < 6) { 
      setPassError("Password must be at least 6 characters"); 
      return; 
    }
    
    setPassSubmitting(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real app, this would update the user's password
    setPassSuccess("Password updated successfully (mock)");
    setNewPassword("");
    setConfirmPassword("");
    setPassSubmitting(false);
  }, [newPassword, confirmPassword]);

  const handleDeleteAccount = useCallback(async () => {
    setDeleting(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Clear all user data from localStorage
    if (user) {
      localStorage.removeItem(`netflix_user`);
      localStorage.removeItem(`netflix_avatar_${user.email}`);
      localStorage.removeItem(`netflix_list_${user.email}`);
    }
    
    await logout();
    navigate("/login");
  }, [user, logout, navigate]);

  if (!user) {
    navigate("/login");
    return null;
  }

  const inputClass =
    "w-full bg-card border border-input text-foreground rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary focus:border-primary placeholder:text-muted-foreground transition-all duration-200 hover:bg-accent/50";

  const sectionTitleClass = "text-foreground font-sans font-semibold text-xl mb-6 flex items-center gap-3";
  const cardClass = "bg-card/95 backdrop-blur-sm border border-border/50 rounded-xl p-8 mb-8 shadow-lg hover:shadow-xl transition-all duration-300";

  return (
    <PageTransition>
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 md:pt-28 px-4 md:px-12 max-w-2xl mx-auto pb-20">
          <motion.h1
            className="text-foreground font-display text-4xl md:text-5xl mb-12 font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Account Settings
          </motion.h1>

          {/* Profile + Avatar */}
          <motion.div
            className={cardClass}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <User className="w-6 h-6 text-primary" />
              </div>
              <h2 className={sectionTitleClass}>Profile Information</h2>
            </div>
            <div className="flex items-center gap-5">
              <div className="relative group">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="w-20 h-20 rounded-full object-cover border-2 border-border shadow-md"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-3xl shadow-md">
                    {user.name[0].toUpperCase()}
                  </div>
                )}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={avatarUploading}
                  className="absolute inset-0 rounded-full bg-background/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
                >
                  {avatarUploading ? (
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Camera className="w-5 h-5 text-foreground" />
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
              </div>
              <div className="flex-1">
                <p className="text-foreground font-semibold text-xl mb-1">{user.name}</p>
                <p className="text-muted-foreground text-base">{user.email}</p>
                {avatarUploading && (
                  <p className="text-primary text-sm mt-2 animate-pulse flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    Uploading avatar…
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Update Email */}
          <motion.div
            className={cardClass}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h2 className={sectionTitleClass}>Email Settings</h2>
            </div>
            <form onSubmit={handleEmailUpdate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">New Email Address</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter your new email address"
                  required
                  className={inputClass}
                />
              </div>
              {emailError && (
                <motion.div 
                  className="bg-destructive/10 border border-destructive/30 rounded-lg p-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <p className="text-destructive text-sm font-medium">{emailError}</p>
                </motion.div>
              )}
              {emailSuccess && (
                <motion.div 
                  className="bg-primary/10 border border-primary/30 rounded-lg p-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <p className="text-primary text-sm font-medium">{emailSuccess}</p>
                </motion.div>
              )}
              <button
                type="submit"
                disabled={emailSubmitting || !newEmail}
                className="btn-netflix py-3 px-8 text-base font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
              >
                {emailSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Updating Email…
                  </span>
                ) : (
                  "Update Email"
                )}
              </button>
            </form>
          </motion.div>

          {/* Update Password */}
          <motion.div
            className={cardClass}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <h2 className={sectionTitleClass}>Password Settings</h2>
            </div>
            <form onSubmit={handlePasswordUpdate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your new password"
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your new password"
                  required
                  className={inputClass}
                />
              </div>
              {passError && (
                <motion.div 
                  className="bg-destructive/10 border border-destructive/30 rounded-lg p-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <p className="text-destructive text-sm font-medium">{passError}</p>
                </motion.div>
              )}
              {passSuccess && (
                <motion.div 
                  className="bg-primary/10 border border-primary/30 rounded-lg p-4"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <p className="text-primary text-sm font-medium">{passSuccess}</p>
                </motion.div>
              )}
              <button
                type="submit"
                disabled={passSubmitting || !newPassword || !confirmPassword}
                className="btn-netflix py-3 px-8 text-base font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
              >
                {passSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Updating Password…
                  </span>
                ) : (
                  "Change Password"
                )}
              </button>
            </form>
          </motion.div>

          {/* Delete Account */}
          <motion.div
            className="bg-destructive/5 border border-destructive/30 rounded-xl p-8 shadow-lg hover:shadow-destructive/10 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-destructive/20 rounded-lg">
                <Shield className="w-6 h-6 text-destructive" />
              </div>
              <h2 className="text-destructive font-sans font-bold text-xl">Danger Zone</h2>
            </div>
            <div className="space-y-6">
              <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6">
                <p className="text-foreground font-semibold text-lg mb-3">⚠️ Warning: Irreversible Action</p>
                <ul className="text-muted-foreground text-base space-y-2 list-disc list-inside">
                  <li>Permanently delete your account and all data</li>
                  <li>Remove your watchlist and viewing history</li>
                  <li>Delete your profile and uploaded avatar</li>
                  <li>Clear all personal information from our servers</li>
                </ul>
              </div>
              <Button
                variant="destructive"
                onClick={() => setDeleteOpen(true)}
                className="gap-3 hover:bg-destructive/90 px-6 py-3 text-base font-medium rounded-lg"
              >
                <Trash2 className="w-5 h-5" />
                Delete Account Forever
              </Button>
            </div>
          </motion.div>
        </div>
        <Footer />

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="w-5 h-5" />
                Delete Account
              </DialogTitle>
              <DialogDescription className="text-left">
                This will permanently delete your account, watchlist, and all data. This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="bg-destructive/10 border border-destructive/30 rounded-md p-3">
                <p className="text-sm text-muted-foreground">
                  Type <strong className="text-destructive">DELETE</strong> to confirm this action:
                </p>
              </div>
              <input
                type="text"
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
                placeholder='Type "DELETE" to confirm'
                className={inputClass}
                autoFocus
              />
            </div>
            <DialogFooter className="gap-2">
              <Button 
                variant="outline" 
                onClick={() => { setDeleteOpen(false); setDeleteConfirm(""); }}
                disabled={deleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                disabled={deleteConfirm !== "DELETE" || deleting}
                onClick={handleDeleteAccount}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deleting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Deleting…
                  </span>
                ) : (
                  "Delete Forever"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
};

export default AccountSettings;
