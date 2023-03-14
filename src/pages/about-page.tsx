import { Link } from "react-router-dom";
import { selectAuthState, updateProfileAction } from "../redux-toolkit/auth/auth-slice";
import { useAppDispatch, useAppSelector } from "../redux-toolkit/hooks";

function AboutPage() {
    const {profile, email} = useAppSelector(selectAuthState);
    const dispatch = useAppDispatch();

    const updateProfile = () => {
        dispatch(updateProfileAction());
    }

    return (
        <>  
            <h1>About Page</h1>
            <p>{profile} {email}</p>
            <button onClick={updateProfile}>Update Profile</button>
            <Link to='/' replace={true}>กลับหน้าหลัก</Link>
        </>
    );
}

export default AboutPage;