const heading = {
    color: 'blue',
    fontSize: '50px'
}

const cards = {
    width: '18rem'
}

function Feed() {
    return(
        <>
            
            
            <nav className="navbar bg-body-tertiary">
                <div className="collapse" id="navbarToggleExternalContent" data-bs-theme="dark">
                    <div className="bg-dark p-4">
                        <h5 className="text-body-emphasis h4">My Groups</h5>
                        {/*Dynamically add groups member is a part of.  When clicked, go to that groups feed.*/}
                        <span className="text-body-secondary">Toggleable via the navbar brand.</span>
                    </div>
                </div>
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon">
                            
                        </span>
                    </button>
                    <a className="navbar-brand">TaskFeed</a>
                    <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </nav> 

            {/*Retrieving Posts*/}
            <ul className="list-group">
                <li className="list-group-item">
                    <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox"/>
                    <label className="form-check-label" for="firstCheckbox">
                    <div className="card" style={cards}>
                        <div className="card-body">
                            <h5 className="card-title">Posters Name</h5>
                            <h6 className="card-subtitle mb-2 text-body-secondary">Date Posted</h6>
                            <p className="card-text">Text provided by poster</p>
                            {/*If user added image insert it here*/}
                            <a href="#" className="card-link">Card link</a>
                            {/*Button to add comment to post*/}                    
                            <a href="#" className="card-link">Another link</a>
                        </div>
                    </div>          
                    </label>
                </li>
            </ul>
                <div className="card" style={cards}>
                    <div className="card-body">
                        <h5 className="card-title">Posters Name</h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">Date Posted</h6>
                        <p className="card-text">Text provided by poster</p>
                        {/*If user added image insert it here*/}
                        <a href="#" className="card-link">Card link</a>
                        {/*Button to add comment to post*/}                    
                        <a href="#" className="card-link">Another link</a>
                    </div>
                </div>          
            
        </>
    )
}

export default Feed







