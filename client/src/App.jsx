
import { useState, useEffect } from 'react'
import { LayoutDashboard, Users, Settings, Plus, Search, ChevronDown, Menu as MenuIcon } from 'lucide-react'
import './App.css'

const countries = [
  'Bangladesh', 'Canada', 'China', 'France', 'India',
  'Japan', 'Nepal', 'Sri Lanka', 'UK', 'USA'
]

const citiesByCountry = {
  India: ['Hyderabad', 'Bengaluru', 'Chennai', 'Mumbai', 'Delhi', 'Pune'],
  USA: ['New York', 'Chicago', 'Los Angeles', 'Houston'],
  UK: ['London', 'Manchester', 'Birmingham'],
  Canada: ['Toronto', 'Vancouver', 'Montreal'],
  Australia: ['Sydney', 'Melbourne'],
}

const skillsList = [
  'AWS', 'DevOps', 'Full Stack Developer',
  'Middleware', 'QA-Automation', 'WebServices'
]

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  mobileNumber: '',
  dateOfBirth: '',
  gender: '',
  address: '',
  country: '',
  city: '',
  skills: [],
}

function MoreFeaturePage({ page, onBack }) {
  const [menuChoice, setMenuChoice] = useState('Testing')
  const [singleValue, setSingleValue] = useState('')
  const [multiValues, setMultiValues] = useState([])
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState([])
  const [openSections, setOpenSections] = useState([0])
  const [sliderValue, setSliderValue] = useState(3)
  const [popupMessage, setPopupMessage] = useState('')
  const [uploadedImage, setUploadedImage] = useState(null)

  const toggleSection = (index) => {
    setOpenSections(current =>
      current.includes(index)
        ? current.filter(item => item !== index)
        : [...current, index]
    )
  }

  


const addTag = () => {
  const value = tagInput.trim()

  console.log('Tag input:', value)

  if (!value) {
    alert('Please enter a tag first.')
    return
  }

  if (tags.some(tag => tag.toLowerCase() === value.toLowerCase())) {
    alert('This tag already exists.')
    return
  }

  setTags(current => [...current, value])
  setTagInput('')
}



  const downloadImage = () => {
    if (!uploadedImage) return
    const link = document.createElement('a')
    link.href = uploadedImage.url
    link.download = uploadedImage.name
    link.click()
  }

  const sectionStyle = {
    background: '#fff',
    padding: '20px',
    margin: '20px 0',
    border: '1px solid #e1e5eb',
    borderRadius: '8px',
  }

  const headingStyle = { marginTop: 0 }
  const buttonStyle = { margin: '5px', padding: '9px 14px', cursor: 'pointer' }
  const inputStyle = { padding: '10px', margin: '6px', maxWidth: '100%' }

   return (
    <div className="more-feature-page">
      <p className="eyebrow">MORE / {page.toUpperCase()}</p>
      <h1>{page}</h1>

 
{page === 'Menu' && (
  <div style={sectionStyle}>
    <h2 style={headingStyle}>Single Menus and Sub Menus</h2>
    <p>Select a menu item to view its content.</p>

    <div className="menu-options">
      {['Testing', 'Java', '.Net', 'Data Base'].map(item => (
        <button
          key={item}
          style={buttonStyle}
          className={
            menuChoice === item
              ? 'primary-button menu-option active'
              : 'secondary-button menu-option'
          }
          onClick={() => setMenuChoice(item)}
        >
          {item}
        </button>
      ))}
    </div>

    <div className="menu-result">
      <h3>{menuChoice}</h3>
      <p>You selected the {menuChoice} menu.</p>

      <details className="submenu">
        <summary>Open Sub Menu</summary>
        <div className="submenu-options">
          {['Testing', 'Java', '.Net', 'Data Base'].map(item => (
            <button
              key={item}
              className="secondary-button"
              onClick={() => setMenuChoice(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </details>
    </div>
  </div>
)}

{page === 'Autocomplete' && (
  <div style={sectionStyle}>
    <h2 style={headingStyle}>Autocomplete</h2>
    <p>Type or select an option from the suggestions.</p>

    <div className="feature-card">
      <label htmlFor="single-autocomplete">Single Selection</label>
      <input
        id="single-autocomplete"
        list="autocomplete-options"
        value={singleValue}
        onChange={e => setSingleValue(e.target.value)}
        placeholder="Search a programming language..."
      />
      <datalist id="autocomplete-options">
        <option value="Java" />
        <option value="Python" />
        <option value="JavaScript" />
        <option value="C++" />
        <option value="SQL" />
        <option value="React" />
      </datalist>
      {singleValue && (
        <p className="feature-success">
          Selected: {singleValue}
        </p>
      )}
    </div>

    <div className="feature-card">
      <h3>Multiple Selection</h3>
      <p>Select one or more technologies.</p>
      {['Java', 'Python', 'JavaScript', 'SQL', 'React'].map(item => (
        <label key={item} style={{ display: 'block', margin: '12px 0' }}>
          <input
            type="checkbox"
            checked={multiValues.includes(item)}
            onChange={e =>
              setMultiValues(current =>
                e.target.checked
                  ? [...current, item]
                  : current.filter(value => value !== item)
              )
            }
          />
          {item}
        </label>
      ))}
      <p>Selected: {multiValues.length ? multiValues.join(', ') : 'None'}</p>
    </div>

    <div className="feature-card">
      <h3>Add Custom Tags</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        <input
          value={tagInput}
          onChange={e => setTagInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault()
              addTag()
            }
          }}
          placeholder="Enter a technology..."
        />
        <button
  type="button"
  className="primary-button"
  onClick={addTag}
>
  Add Tag
</button>
      </div>

      <div style={{ marginTop: '12px' }}>
        {tags.map(tag => (
          <span className="feature-tag" key={tag}>
            {tag}
            <button
              aria-label={`Remove ${tag}`}
              onClick={() => setTags(current => current.filter(item => item !== tag))}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  </div>
)}

{page === 'Collapsible Content' && (
  <div style={sectionStyle}>
    <h2 style={headingStyle}>Collapsible Content</h2>
    <p>Expand a section to view its content.</p>

    {[
      {
        title: 'What is Testing?',
        answer: 'Testing checks that software behaves as expected.'
      },
      {
        title: 'What is Java?',
        answer: 'Java is a general-purpose programming language.'
      },
      {
        title: 'What is a Database?',
        answer: 'A database stores and organizes information.'
      }
    ].map((item, index) => (
      <div className="content-accordion" key={item.title}>
        <button
          onClick={() => toggleSection(index)}
          aria-expanded={openSections.includes(index)}
        >
          <span>{item.title}</span>
          <span>{openSections.includes(index) ? '−' : '+'}</span>
        </button>

        {openSections.includes(index) && (
          <div className="accordion-answer">
            <p>{item.answer}</p>
          </div>
        )}
      </div>
    ))}

    <div className="accordion-actions">
      <button
        className="primary-button"
        onClick={() => setOpenSections([0, 1, 2])}
      >
        Expand All
      </button>
      <button
        className="secondary-button"
        onClick={() => setOpenSections([])}
      >
        Collapse All
      </button>
    </div>
  </div>
)}


      {page === 'Images' && (
        <div style={sectionStyle}>
          <h2 style={headingStyle}>Image Upload and Download</h2>
          <input
            type="file"
            accept="image/*"
            onChange={e => {
              const file = e.target.files?.[0]
              if (file) {
                setUploadedImage({
                  name: file.name,
                  url: URL.createObjectURL(file),
                })
              }
            }}
          />
          {uploadedImage && (
            <div style={{ marginTop: '20px' }}>
              <p>{uploadedImage.name}</p>
              <img
                src={uploadedImage.url}
                alt="Uploaded preview"
                style={{ display: 'block', maxWidth: '100%', maxHeight: '300px', marginBottom: '12px' }}
              />
              <button style={buttonStyle} onClick={downloadImage}>
                Download Image
              </button>
            </div>
          )}
          <p className="muted">The selected image is previewed locally in your browser.</p>
        </div>
      )}

      {page === 'Slider' && (
        <div style={sectionStyle}>
          <h2 style={headingStyle}>Slider</h2>
          <label>
            Current Value: <strong>{sliderValue}</strong>
            <input
              type="range"
              min="1"
              max="10"
              value={sliderValue}
              onChange={e => setSliderValue(Number(e.target.value))}
              style={{ display: 'block', width: '100%', maxWidth: '450px', margin: '20px 0' }}
            />
          </label>
        </div>
      )}

      {page === 'Tooltips' && (
        <div style={sectionStyle}>
          <h2 style={headingStyle}>Tooltips</h2>
          <p>Hover over each control to see its tooltip.</p>
          <button title="This is a button tooltip" style={buttonStyle}>Hover over me</button>
          <span title="This label explains the example" style={buttonStyle}>Hover over this text</span>
          <input title="Enter your name here" placeholder="Hover over this input" style={inputStyle} />
        </div>
      )}

      {page === 'Popups' && (
        <div style={sectionStyle}>
          <h2 style={headingStyle}>Popups</h2>
          <button style={buttonStyle} onClick={() => window.alert('Hello from Magnus!')}>
            Alert Popup
          </button>
          <button
            style={buttonStyle}
            onClick={() => setPopupMessage(
              window.confirm('Do you want to continue?')
                ? 'You selected OK.'
                : 'You selected Cancel.'
            )}
          >
            Confirm Popup
          </button>
          <button style={buttonStyle} onClick={() => setPopupMessage('This is a popup message.')}>
            Show Message
          </button>
          {popupMessage && (
            <div className="info-panel" role="status">
              <p>{popupMessage}</p>
              <button style={buttonStyle} onClick={() => setPopupMessage('')}>Close</button>
            </div>
          )}
        </div>
      )}

      {page === 'Links' && (
        <div style={sectionStyle}>
          <h2 style={headingStyle}>Links</h2>
          <p><a href="https://www.google.com" target="_blank" rel="noreferrer">Working Link</a></p>
          <p><a href="/this-page-does-not-exist" target="_blank" rel="noreferrer">Broken Link Example</a></p>
          <p>
            <a href="https://www.jalaacademy.com" target="_blank" rel="noreferrer">
              JALA Academy Website
            </a>
          </p>
          <p><a href="https://httpstat.us/404" target="_blank" rel="noreferrer">HTTP 404 Status Example</a></p>
          <p className="muted">External links open in a new tab. Availability depends on the destination website.</p>
        </div>
      )}

      {page === 'CSS Properties' && (
        <div style={sectionStyle}>
          <h2 style={headingStyle}>CSS Properties</h2>
          <p><a href="#css-example">Example link</a></p>
          <p><label>Example label: <input style={inputStyle} placeholder="Sample input" /></label></p>
          <button className="primary-button" style={buttonStyle}>Primary Button</button>
          <button className="secondary-button" style={buttonStyle}>Secondary Button</button>
          <p style={{ padding: '12px', background: '#dff5e1', color: '#17652b' }}>Success alert example</p>
          <p style={{ padding: '12px', background: '#fff0d6', color: '#805000' }}>Warning alert example</p>
          <label>Progress: 70%</label>
          <progress value="70" max="100" style={{ display: 'block', width: '100%', marginTop: '10px' }} />
          <div id="css-example" />
        </div>
      )}

      {page === 'iFrames' && (
        <div style={sectionStyle}>
          <h2 style={headingStyle}>iFrames</h2>
          <h3>Frame One — SeleniumHQ</h3>
          <iframe
            title="SeleniumHQ"
            src="https://www.selenium.dev/"
            style={{ width: '100%', height: '250px', border: '1px solid #ddd' }}
          />
          <h3>Frame Two — Magnus / JALA Academy</h3>
          <iframe
            title="JALA Academy"
            src="https://www.jalaacademy.com/"
            style={{ width: '100%', height: '250px', border: '1px solid #ddd' }}
          />
          <h3>Frame Three — YouTube</h3>
          <iframe
            title="YouTube video"
            src="https://www.youtube-nocookie.com/embed/m7dSteMFhZI"
            style={{ width: '100%', height: '300px', border: '1px solid #ddd' }}
            allowFullScreen
          />
          <p className="muted">Some websites block iframe embedding; if a frame is blank, open that website directly.</p>
        </div>
      )}

      <button className="secondary-button" onClick={onBack}>
        Back to Home
      </button>
    </div>
  )
}


function App() {
  const [page, setPage] = useState('Home')
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
const [employees, setEmployees] = useState([])
const [searchName, setSearchName] = useState('')
const [searchMobile, setSearchMobile] = useState('')
const [currentPage, setCurrentPage] = useState(1)
const [totalPages, setTotalPages] = useState(1)
const [loadingEmployees, setLoadingEmployees] = useState(false)
const [searchError, setSearchError] = useState('')
const [editingId, setEditingId] = useState(null)
const [activeTab, setActiveTab] = useState('Tab 1')

useEffect(() => {
  if (page !== 'Search') return

  let cancelled = false

  async function loadEmployees() {
    setLoadingEmployees(true)
    setSearchError('')

    try {
      const params = new URLSearchParams({
        name: searchName,
        mobile: searchMobile,
        page: String(currentPage),
        limit: '10',
      })

      const response = await fetch(`/api/employees?${params}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Could not load employees.')
      }

      if (!cancelled) {
        setEmployees(data.employees || [])
        setTotalPages(Math.max(1, data.totalPages || 1))
      }
    } catch (error) {
      if (!cancelled) {
        setSearchError(error.message || 'Could not connect to the server.')
        setEmployees([])
      }
    } finally {
      if (!cancelled) setLoadingEmployees(false)
    }
  }

  loadEmployees()

  return () => {
    cancelled = true
  }
}, [page, searchName, searchMobile, currentPage])


function editEmployee(employee) {
  setForm({
    firstName: employee.firstName || '',
    lastName: employee.lastName || '',
    email: employee.email || '',
    mobileNumber: employee.mobileNumber || '',
    dateOfBirth: employee.dateOfBirth
      ? new Date(employee.dateOfBirth).toISOString().slice(0, 10)
      : '',
    gender: employee.gender || '',
    address: employee.address || '',
    country: employee.country || '',
    city: employee.city || '',
    skills: employee.skills || [],
  })

  setEditingId(employee._id)
  setMessage('')
  setError('')
  setPage('Create')
}

async function deleteEmployee(id) {
  if (!window.confirm('Are you sure you want to delete this employee?')) {
    return
  }

  setSearchError('')

  try {
    const response = await fetch(`/api/employees/${id}`, {
      method: 'DELETE',
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Could not delete employee.')
    }

    setEmployees(current => current.filter(employee => employee._id !== id))
    setSearchError('Employee deleted successfully.')

    // Refresh the current page after deletion.
    setCurrentPage(current => current)
  } catch (error) {
    setSearchError(error.message || 'Could not delete employee.')
  }
}

  function updateField(event) {
    const { name, value } = event.target
    setForm(current => ({
      ...current,
      [name]: value,
      ...(name === 'country' ? { city: '' } : {}),
    }))
  }

  function toggleSkill(skill) {
    setForm(current => ({
      ...current,
      skills: current.skills.includes(skill)
        ? current.skills.filter(item => item !== skill)
        : [...current.skills, skill],
    }))
  }
async function saveEmployee(event) {
  event.preventDefault()
  setMessage('')
  setError('')
  setSaving(true)

  try {
    const response = await fetch(
      editingId ? `/api/employees/${editingId}` : '/api/employees',
      {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Could not save employee.')
    }

    setMessage(
      editingId
        ? 'Employee updated successfully!'
        : 'Employee saved successfully!'
    )
    setEditingId(null)
    setForm(emptyForm)
  } catch (err) {
    setError(
      err.message === 'Failed to fetch'
        ? 'Cannot connect to the backend. Make sure the server is running on port 5000.'
        : err.message
    )
  } finally {
    setSaving(false)
  }
}

  const isCreatePage = page === 'Create'

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">M</span>
          <div>
            <strong>Magnus</strong>
            <small>Employee Management</small>
          </div>
        </div>

       <p className="nav-label">MAIN MENU</p>

        <button className={`nav-item ${page === 'Home' ? 'active' : ''}`}
          onClick={() => setPage('Home')}>
          <LayoutDashboard size={18} /> Home
        </button>

<div className="nav-group">
  <div className="nav-item">
    <Users size={18} /> Employee
  </div>

  <div className="sub-menu">
    <button
      className={`nav-item sub-item ${page === 'Create' ? 'active' : ''}`}
      onClick={() => {
  setForm(emptyForm)
  setEditingId(null)
  setMessage('')
  setError('')
  setPage('Create')
}}
    >
      <span className="sub-dot" /> Create
    </button>

    <button
      className={`nav-item sub-item ${page === 'Search' ? 'active' : ''}`}
      onClick={() => setPage('Search')}
    >
      <span className="sub-dot" /> Search
    </button>
  </div>
</div>


<div className="nav-group">
  <div className="nav-item">
    <ChevronDown size={18} /> More
  </div>

  <div className="sub-menu">
    {[
      'Multiple Tabs',
      'Menu',
      'Autocomplete',
      'Collapsible Content',
      'Images',
      'Slider',
      'Tooltips',
      'Popups',
      'Links',
      'CSS Properties',
      'iFrames',
    ].map(item => (
      <button
        className="nav-item sub-item"
        key={item}
        onClick={() => setPage(item)}
      >
        <span className="sub-dot" />
        {item}
      </button>
    ))}
  </div>
</div>


        <button className="nav-item settings-link" onClick={() => setPage('Settings')}>
          <Settings size={18} /> Settings
        </button>
      </aside>

      <main className="main-area">
       
<header className="topbar">
  <button className="icon-button" aria-label="Menu">
    <MenuIcon size={20} />
  </button>

  <div className="breadcrumb">
    <span>Magnus</span>
    <span>/</span>
    <strong>{page}</strong>
  </div>

  <div className="topbar-right">
    <span className="status-dot"></span>
    <span>Local workspace</span>
  </div>
</header>


        <section className="page-content">
{page === 'Home' ? (
  <>
    <div className="welcome-banner">
      <div>
        <p className="eyebrow">DEVELOPMENT WORKSPACE</p>
        <h1>Welcome to JALA Academy</h1>
        <p>
          Magnus Employee Management Practice Application.
          Manage employee records and explore the available features.
        </p>
      </div>

      <div className="welcome-symbol">
        <LayoutDashboard size={54} />
      </div>
    </div>

    <div className="section-heading">
      <div>
        <h2>Quick Access</h2>
        <p>Choose a feature to get started.</p>
      </div>
    </div>

    <div className="quick-grid">
      <button className="quick-card" onClick={() => setPage('Create')}>
        <div className="quick-icon purple"><Plus size={22} /></div>
        <h3>Employee Create</h3>
        <p>Add employee details and save a new record.</p>
        <span className="card-link">Create Employee →</span>
      </button>

      <button className="quick-card" onClick={() => setPage('Search')}>
        <div className="quick-icon blue"><Search size={22} /></div>
        <h3>Employee Search</h3>
        <p>Find and manage existing employee records.</p>
        <span className="card-link">Search Employees →</span>
      </button>

      <button className="quick-card" onClick={() => setPage('Multiple Tabs')}>
        <div className="quick-icon orange"><Settings size={22} /></div>
        <h3>More Features</h3>
        <p>Explore the additional Magnus practice options.</p>
        <span className="card-link">Explore Features →</span>
      </button>
    </div>

    <div className="info-panel">
      <div className="info-symbol">i</div>
      <div>
        <strong>Project Workspace</strong>
        <p>
          Practise employee CRUD operations and explore the
          additional features available in Magnus.
        </p>
      </div>
    </div>
  </>
) : isCreatePage ? (

            <>
              <p className="eyebrow">DEVELOPMENT / EMPLOYEE</p>
              <h1>Employee Create</h1>
              <p className="muted">Enter the employee details below.</p>

              <form className="employee-form" onSubmit={saveEmployee}>
                <div className="form-grid">
                  <label>First Name *
                    <input name="firstName" value={form.firstName}
                      onChange={updateField} required />
                  </label>
                  <label>Last Name *
                    <input name="lastName" value={form.lastName}
                      onChange={updateField} required />
                  </label>
                  <label>Email *
                    <input type="email" name="email" value={form.email}
                      onChange={updateField} required />
                  </label>
                  <label>Mobile Number *
                    <input name="mobileNumber" value={form.mobileNumber}
                      onChange={updateField} required
                      pattern="[0-9+() -]{7,20}"
                      title="Enter a valid phone number." />
                  </label>
                  <label>Date of Birth *
                    <input type="date" name="dateOfBirth" value={form.dateOfBirth}
                      onChange={updateField} required />
                  </label>
                  <label>Gender *
                    <select name="gender" value={form.gender}
                      onChange={updateField} required>
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </label>
                  <label>Country *
                    <select name="country" value={form.country}
                      onChange={updateField} required>
                      <option value="">Select Country</option>
                      {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </label>
                  <label>City *
                    <select name="city" value={form.city}
                      onChange={updateField} required disabled={!form.country}>
                      <option value="">Select City</option>
                      {(citiesByCountry[form.country] || []).map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                      {form.country && !(citiesByCountry[form.country]?.length) && (
                        <option value="Other">Other</option>
                      )}
                    </select>
                  </label>
                  <label className="full-width">Address *
                    <textarea name="address" value={form.address}
                      onChange={updateField} required rows="3" />
                  </label>
                </div>

                <fieldset className="skills-field">
                  <legend>Skills</legend>
                  <div className="skills-grid">
                    {skillsList.map(skill => (
                      <label className="skill-option" key={skill}>
                        <input type="checkbox"
                          checked={form.skills.includes(skill)}
                          onChange={() => toggleSkill(skill)} />
                        {skill}
                      </label>
                    ))}
                  </div>
                </fieldset>

                {message && <p className="success-message">{message}</p>}
                {error && <p className="error-message">{error}</p>}

                <div className="form-actions">
                  <button type="button" className="secondary-button"
                    onClick={() => { setForm(emptyForm); setMessage(''); setError('') }}>
                    Clear
                  </button>
                  <button type="submit" className="primary-button" disabled={saving}>
{saving ? 'Saving...' : editingId ? 'Update Employee' : 'Save Employee'}                  </button>
                </div>
              </form>
            </>
         
          ) : page === 'Search' ? (
            <>
              <p className="eyebrow">DEVELOPMENT / EMPLOYEE</p>
              <h1>Employee Search</h1>
              <p className="muted">Search, edit, and delete employee records.</p>

              <div className="search-controls">
                <label>
                  Employee Name
                  <input
                    type="text"
                    placeholder="Search by name"
                    value={searchName}
                    onChange={(e) => {
                      setSearchName(e.target.value)
                      setCurrentPage(1)
                    }}
                  />
                </label>

                <label>
                  Mobile Number
                  <input
                    type="text"
                    placeholder="Search by mobile number"
                    value={searchMobile}
                    onChange={(e) => {
                      setSearchMobile(e.target.value)
                      setCurrentPage(1)
                    }}
                  />
                </label>

                <button
                  className="secondary-button"
                 onClick={() => {
  setForm(emptyForm)
  setEditingId(null)
  setMessage('')
  setError('')
}}
                >
                  Clear Search
                </button>
              </div>

              {loadingEmployees && <p className="muted">Loading employees...</p>}
              {searchError && <p className="error-message">{searchError}</p>}

              {!loadingEmployees && !searchError && employees.length === 0 && (
                <p className="muted">No employees found.</p>
              )}

              {employees.length > 0 && (
                <>
                  <div className="employee-table-wrapper">
                    <table className="employee-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Mobile</th>
                          <th>Country</th>
                          <th>City</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {employees.map((employee) => (
                          <tr key={employee._id}>
                            <td>{employee.firstName} {employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>{employee.mobileNumber}</td>
                            <td>{employee.country}</td>
                            <td>{employee.city}</td>
                            <td>
                              <div className="table-actions">
                                <button
                                  className="secondary-button"
                                  onClick={() => editEmployee(employee)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="secondary-button"
                                  onClick={() => deleteEmployee(employee._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="pagination">
                    <button
                      className="secondary-button"
                      disabled={currentPage <= 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Previous
                    </button>

                    <span>Page {currentPage} of {totalPages}</span>

                    <button
                      className="secondary-button"
                      disabled={currentPage >= totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </>
         
          ) : page === 'Multiple Tabs' ? (
            <>
              <p className="eyebrow">MORE / MULTIPLE TABS</p>
              <h1>Multiple Tabs</h1>
              <p className="muted">
                Explore different tabs and view their content.
              </p>

              <div className="tabs-container">
                <div className="tabs-header">
                  <button
                    className={activeTab === 'Tab 1' ? 'tab-button active' : 'tab-button'}
                    onClick={() => setActiveTab('Tab 1')}
                  >
                    Tab 1
                  </button>

                  <button
                    className={activeTab === 'Tab 2' ? 'tab-button active' : 'tab-button'}
                    onClick={() => setActiveTab('Tab 2')}
                  >
                    Tab 2
                  </button>

                  <button
                    className={activeTab === 'Tab 3' ? 'tab-button active' : 'tab-button'}
                    onClick={() => setActiveTab('Tab 3')}
                  >
                    Tab 3
                  </button>
                </div>

                <div className="tab-content">
                  {activeTab === 'Tab 1' && (
                    <>
                      <h2>Tab 1 Content</h2>
                      <p>Welcome to the first tab. This is the basic tab content.</p>
                    </>
                  )}

                  {activeTab === 'Tab 2' && (
                    <>
                      <h2>Tab 2 Content</h2>
                      <p>This is the second tab. Click the other tabs to switch content.</p>
                    </>
                  )}

                  {activeTab === 'Tab 3' && (
                    <>
                      <h2>Tab 3 Content</h2>
                      <p>This is the third tab with its own content.</p>
                    </>
                  )}
                </div>
              </div>

              <button
                className="secondary-button"
                onClick={() => setPage('Home')}
              >
                Back to Home
              </button>
            </>
         
          ) : (
            <MoreFeaturePage
              page={page}
              onBack={() => setPage('Home')}
            />
          )}


        </section>

<footer className="footer">
  © 2026 JALA Technologies · Magnus Practice Application
</footer>     
 </main>
    </div>
  )
}

export default App
