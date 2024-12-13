"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import { useAuth } from '../auth/authContext';


import Nav from "../components/nav/nav.js";
import Footer from "../components/footer/footer.js";


import "./admin.css"

const Admin = () => {
  const router = useRouter();
  const { authData } = useAuth();
  const auth = useAuth()

  const [isUsers, setIsUsers] = useState(false);
  const [users, setUsers] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [selectedUserEmail, setSelectedUserEmail] = useState(null)
  const [editedPass, setEditedPass] = useState('');
  

  const [isGallery, setIsGallery] = useState(false);
  const [isBlog, setIsBlog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [isStats, setIsStats] = useState(false);
  const [stats, setStats] = useState([]);
  const [selectedStatId, setSelectedStatId] = useState(null);
  const [editedStat, setEditedStat] = useState('');

  const [isTeam, setIsTeam] = useState(false);
  const [team, setTeam] = useState([]);
  const [selectedTeamImage, setSelectedTeamImage] = useState(null);

  const [images, setImages] = useState([]);
  const [deleteMessages, setDeleteMessages] = useState([]);


  useEffect(() => {
    if (!authData.isAuthenticated) {
      alert("NOT LOGGED IN");
      router.push('/login');
    } else {
      console.log("LOGGED IN");
    }
  }, []);

  const handleUsersClick = () => {
    setIsUsers(true);
    setIsGallery(false);
    setIsStats(false);
    setIsBlog(false);
    setIsTeam(false);
  };

  const handleGalleryClick = () => {
    setIsUsers(false);
    setIsGallery(true);
    setIsStats(false);
    setIsBlog(false);
    setIsTeam(false);
  };

  const handleBlogClick = () => {
    setIsUsers(false);
    setIsGallery(false);
    setIsBlog(true);
    setIsStats(false);
    setIsTeam(false);
  };

  const handleStatsClick = () => {
    setIsUsers(false);
    setIsGallery(false);
    setIsBlog(false);
    setIsStats(true);
    setIsTeam(false);
  };

  const handleTeamClick = () => {
    setIsTeam(true);
    setIsUsers(false);
    setIsGallery(false);
    setIsStats(false);
    setIsBlog(false);
  };
  

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/.netlify/functions/get-stats', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'same-origin' // or 'include' depending on your setup
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const statsData = await response.json();
        console.log(statsData);
        
        const statsArray = Object.entries(statsData).map(([key, value]) => ({ id: key, data: value }));
        setStats(statsArray);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };
  
    
  
    const fetchImages = async () => {
      try {
        const response = await fetch('/.netlify/functions/get-g-images'); // Adjust the API endpoint if necessary
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
  
        const imagePaths = await response.json();
        setImages(imagePaths); // Set the image paths to state
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    

    const fetchUsers = async () => {
      try {
        const response = await fetch('/.netlify/functions/get-users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const userData = await response.json();
        console.log(userData);
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers({}); // Optionally clear or display an error message
      }
    };

    const fetchTeam = async () => {
      try {
        const response = await fetch('/.netlify/functions/get-team');
        if (!response.ok) {
          throw new Error('Failed to fetch team');
        }
        const teamData = await response.json();
        setTeam(teamData); // Update state with the fetched team data
      } catch (error) {
        console.error('Error fetching team:', error);
      }
    };
    
  
    fetchImages();
    fetchStats();
    fetchUsers();
    fetchTeam();
  }, []);


  const handleEditStat = async () => {
    if (!editedStat) return; // Make sure editedStat is defined
    
    try {
      const response = await fetch(`/.netlify/functions/edit-stats`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedStatId,  // Pass selectedStatId in the body
          data: editedStat  // Pass the new value for the statistic
        })
      });
  
      if (response.status === 200) {
        console.log('Stat updated successfully');
  
        // Update stats locally after the PUT request
        setStats(prevStats => prevStats.map(stat => {
          if (stat.id === selectedStatId) {
            return { ...stat, data: editedStat };
          }
          return stat;
        }));
  
        handleCloseForm();
      } else {
        console.error('Failed to update stat');
      }
    } catch (error) {
      console.error('Error updating stat:', error);
    }
  };

  

  const handleEditUser = async () => {
    if (!selectedUserEmail || !editedPass) return;
    
    try {
      const response = await fetch('/.netlify/functions/get-users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: selectedUserEmail, 
          password: editedPass 
        })
      });
      
      if (response.status === 200) {
        console.log('User updated successfully');
        handleCloseForm();
      } else {
        console.error('Failed to update user');
        // Optional: Add error handling or user feedback
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

const handleCloseForm = () => {
  setSelectedStatId(null);
  setEditedStat('');
  setSelectedUserEmail(null);
  setEditedPass('');
};

const handleDeleteImage = async (filename) => {
  try {
    const response = await fetch('/.netlify/functions/del-g-images', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete image');
    }

    // Remove the image from the list of displayed images
    setImages((prevUrls) => prevUrls.filter((url) => !url.includes(filename)));

    setDeleteMessages([`Successfully deleted ${filename}`]);
  } catch (error) {
    console.error('Error deleting image:', error);
    setDeleteMessages([`Error deleting ${filename}`]);
  }
};


const handleUploadImage = async () => {
  if (!selectedImage) {
    alert('Please select an image first.');
    return;
  }

  try {
    // Convert image to base64
    const reader = new FileReader();
    reader.readAsDataURL(selectedImage);
    reader.onloadend = async () => {
      const base64Image = reader.result;

      const response = await fetch('/.netlify/functions/post-g-images', {
        method: 'POST',
        body: JSON.stringify({ image: base64Image }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      console.log('Upload successful:', data.message);

      // Update the image list with the new image URL
      setImages((prevUrls) => [...prevUrls, data.imageUrl]);

      alert('Image uploaded successfully!');
      setSelectedImage(null); // Clear the selected image
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    alert('Error uploading image. Please try again.');
  }
};

const handleUploadTeamImage = async () => {
  const title = document.getElementById('team-title').value;
  const name = document.getElementById('team-name').value;

  if (!selectedTeamImage) {
    alert('Please select an image first.');
    return;
  }

  if (!title || !name) {
    alert('Please fill out both Title and Name.');
    return;
  }

  try {
    const reader = new FileReader();
    reader.readAsDataURL(selectedTeamImage);
    reader.onloadend = async () => {
      const base64Image = reader.result.split(',')[1];  // Extract the base64 string without data URL prefix

      const response = await fetch('/.netlify/functions/post-team-images', {
        method: 'POST',
        body: JSON.stringify({ title, name, image: base64Image }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to upload team image');
      }

      const data = await response.json();
      console.log('Upload successful:', data.message);

      // Update the image list with the new image URL
      setImages((prevUrls) => [...prevUrls, data.imageUrl]);

      alert('Team image uploaded successfully!');
      setSelectedTeamImage(null);  // Reset the selected image after upload
    };
  } catch (error) {
    console.error('Error uploading team image:', error);
    alert('Error uploading image. Please try again.');
  }
};


const handleDeleteTeamImage = async (imageUrl) => {
  try {
    // Extract only the filename from the imageUrl (e.g., 'title_name.jpg')
    const filename = imageUrl.split('/images/team/').pop().trim();
    console.log("FILENAME", filename)

    if (!filename) {
      alert('Invalid image URL');
      return;
    }

    const response = await fetch('/.netlify/functions/del-team-images', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename }),  // Send the filename
    });

    if (!response.ok) {
      throw new Error('Failed to delete team image');
    }

    setTeam((prevTeam) => prevTeam.filter((member) => member.imageUrl !== imageUrl));
    alert('Team image deleted successfully!');
  } catch (error) {
    console.error('Error deleting team image:', error);
    alert('Error deleting image. Please try again.');
  }
};




const handleShowPassword = () => {
  setShowPassword(prevState => !prevState) 
};

const handleLogout = (event) => {
  auth.logout()
  router.push('/login')
}

  return (
    <>
      <Nav/>
        <div>
          
          <div>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={handleUsersClick} disabled={isUsers}>Users</button>
            <button onClick={handleGalleryClick} disabled={isGallery}>Gallery</button>
            <button onClick={handleTeamClick} disabled={isTeam}>Team</button>
            <button onClick={handleBlogClick} disabled={isBlog}>Blog</button>
            <button onClick={handleStatsClick} disabled={isStats}>Stats</button>
          </div>

          {isUsers && (
            <div>
              <h1>Users</h1>
              <table>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{users.email}</td>
                    <td>{showPassword ? users.password : '********'}</td>
                    <td>
                      <button onClick={handleShowPassword}>{showPassword ? 'Hide' : 'Show'}</button>
                      <button onClick={() => setSelectedUserEmail(users.email)}>Edit</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              {selectedUserEmail && (
                <div className="edit-form">
                  <h2>Edit User {selectedUserEmail}</h2>
                  <input 
                    type="text" 
                    value={editedPass} 
                    onChange={(e) => setEditedPass(e.target.value)} 
                    placeholder="Enter new password" 
                  />
                  <button onClick={handleEditUser}>Save</button>
                  <button onClick={handleCloseForm}>Close</button>
                </div>
              )}
            </div>
          )}
            
            {isGallery && (
            <div>
              <h1>Gallery</h1>
              <button onClick={handleUploadImage}>Upload Image</button>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />
              {deleteMessages.length > 0 && (
                <div>
                  <ul>
                    {deleteMessages.map((message, index) => (
                      <li key={index}>{message}</li>
                    ))}
                  </ul>
                  
                </div>
                
              )}
              <table>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Filename</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {images.map((src, index) => {
                    const filename = src.split('/').pop(); // Extract the filename from the image path
                    return (
                      <tr key={index}>
                        <td>
                          <img
                            src={src}
                            alt={`Image ${index}`}
                            style={{ width: '100px', height: 'auto' }}
                          />
                        </td>
                        <td>{filename}</td>
                        <td>
                          <button onClick={() => handleDeleteImage(src)}>Delete</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {isTeam && (
            <div>
              <h1>Team</h1>
              <input
                type="text"
                id="team-title"
                placeholder="Title"
              />
              <input
                type="text"
                id="team-name"
                placeholder="Name"
              />
              <input
                type="file"
                onChange={(e) => setSelectedTeamImage(e.target.files[0])}
              />
              <button onClick={handleUploadTeamImage}>Upload Team Image</button>
              
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Name</th>
                    <th>Images</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {team.map((member, index) => (
                    <tr key={index}>
                      <td>{member.title}</td>
                      <td>{member.name}</td>
                      <td>
                        <img
                          src={member.imageUrl}
                          alt={member.title}
                          style={{ width: '100px', height: 'auto' }}
                        />
                      </td>
                      <td>
                        <button onClick={() => handleDeleteTeamImage(member.imageUrl)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}


          {isBlog && <div>
            <h1>Blog Posts</h1>
                  <table>
                      <thead>
                          <tr>
                              <th>File Name</th>
                              <th>Metadata</th>
                              <th>Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                            <td>blog1</td>
                            <td>Title: Test Blog Post 1 | Written by: Xavier A. | Date: 2024-03-28</td>
                            <td><button>Delete</button></td>
                          </tr>
                          <tr>
                            <td>blog2</td>
                            <td>Title: Test Blog Post 2 | Written by: Xavier A. | Date: 2024-03-28</td>
                            <td><button>Delete</button></td>
                          </tr>
                      </tbody>
                  </table>
          </div>}

          {isStats && <div>
            <h1>Statistics</h1>
                  <table>
                      <thead>
                          <tr>
                              <th>ID</th>
                              <th>Data</th>
                              <th>Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                          {stats.map(stat => (
                              <tr key={stat.id}>
                                  <td>{stat.id}</td>
                                  <td>{stat.data}</td>
                                  <td>
                                      <button onClick={() => setSelectedStatId(stat.id)}>Edit</button>
                                  </td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
                  {selectedStatId && (
                      <div className="edit-form">
                          <h2>Edit Statistic {selectedStatId}</h2>
                          <input 
                              type="text" 
                              value={editedStat} 
                              onChange={(e) => setEditedStat(e.target.value)} 
                              placeholder="Enter new data" 
                          />
                          <button onClick={handleEditStat}>Save</button>
                          <button onClick={handleCloseForm}>Close</button> {/* Close button added */}
                      </div>
                  )}
          </div>}
        </div>
    </>
  );
  
};

export default Admin;
