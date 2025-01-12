import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
    
   const {setAuthUser} = useAuthContext();
   const navigate = useNavigate();

	const signup = async ({ fullName, email, password, role }) => {
		const success = handleInputErrors({ fullName, email, password, role });
		if (!success) return;
        console.log(role);

		try {
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ fullName, email, password, role }),
			});
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("users", JSON.stringify(data));
			setAuthUser(data);
			navigate('/home')
			toast.success("registerd successfully")
		} catch (error) {
			toast.error(error.message);
		} 
	};

	return { signup };
};
export default useSignup;


function handleInputErrors({ fullName, email, password,role}) {
	if (!fullName || !email || !password || !role) {
		toast.error("Please fill in all fields");
		return false;
	}


	if (password.length < 6) {
		toast.error("Password must be at least 6 characters");
		return false;
	}

	return true;
}