# 📸 ADD YOUR PROFILE PICTURE HERE!

## Quick Instructions:

1. **Rename your photo** to: `profile.jpg` (or `profile.png`)
   
2. **Put it in this folder** (`/public/`)

3. **Best specs:**
   - Square format (1:1 ratio)
   - At least 800x800 pixels
   - Good lighting
   - JPG or PNG format

4. **Then edit this file:**
   `/app/components/ProfileShowcase.tsx`
   
   Around **line 191**, uncomment this code:
   ```tsx
   <Image
     src="/profile.jpg"
     alt="Profile Picture"
     fill
     className="object-cover"
     priority
   />
   ```
   
5. **Delete or comment out** the placeholder emoji (lines 186-188)

6. **Save and refresh** - your photo will appear with ALL the amazing effects! ✨

---

## 🎭 What Your Image Will Get:

- ✨ Rotating rainbow border
- 💫 3D tilt effect (follows mouse!)
- 🌟 Shimmer sweep
- 💥 Pulsing glow rings
- 🎯 Floating emoji badges
- ⚙️ Orbiting particles
- 🎨 Professional glass frame

---

**That's it!** Your profile will look absolutely STUNNING! 🚀

For full customization guide, see: `PROFILE_SETUP_GUIDE.md`
