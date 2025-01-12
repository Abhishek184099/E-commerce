import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useSignup from "../hooks/useSignup";


const SignUp = () => {

	const Navigate = useNavigate();
	const [inputs, setInputs] = useState({
		fullName: "",
		email: "",
		password: "",
		role : "",
	});

	console.log(inputs);

	const { signup } = useSignup();

	const handleSubmit = async (e) => {

		e.preventDefault();
		await signup(inputs);
		Navigate('/home')
		
	};

	return (
		<div className='flex flex-col items-center justify-center max-w-96 mx-auto'>
			<div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 mt-28'>
				<h1 className='text-3xl font-semibold text-center text-black'>
					Sign Up 
				</h1>

				<form onSubmit={handleSubmit}>
					<div>
						<label className='label p-2'>
							<span className='text-base label-text'>Full Name</span>
						</label>
						<input
							type='text'
							placeholder='John Doe'
							className='w-full input input-bordered  h-10'
							value={inputs.fullName}
							onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
						/>
					</div>

					<div>
						<label className='label p-2 '>
							<span className='text-base label-text'>Email</span>
						</label>
						<input
							type='email'
							className='w-full input input-bordered h-10'
							value={inputs.email}
							onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
						/>
					</div>

					<div>
						<label className='label'>
							<span className='text-base label-text'>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered h-10'
							value={inputs.password}
							onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
						/>
					</div>
					<div className="flex gap-3 mt-3">
						<label>Role</label>
						<select name="" id="" value={inputs.role} onChange={(e)=> {setInputs({...inputs, role : e.target.value})}} className="">
						<option value="ADMIN">Admin</option>
						<option value="GENERAL">User</option>

						</select>
					</div>


					<Link
						to={"/login"}
						className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'
						href='#'
					>
						Already have an account?
					</Link>

					<div>
						<button className='btn btn-block btn-sm mt-2 border border-slate-700' >
							Sign Up
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;
