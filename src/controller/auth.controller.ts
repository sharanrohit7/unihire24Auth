import { Express,Request,Response } from "express";
import User from "../models/common/auth.model";
import bcrypt from "bcrypt"
import IUser from "../../interface/IUser"
import { signtoken } from "../config/tokenConfig";
import RoleModel from "../models/common/roleModule.model";


export async function signUp(email: string, password: string, roleId: string): Promise<{ user?: IUser; error?: string }> {
    try {
        if (!email) {
            return { error: 'Email is required' };
        }
        if (!password) {
            return { error: 'Password is required' };
        }
        if (!roleId) {
            return { error: 'Role ID is required' };
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return { error: 'Username already exists' };
        }
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({ email, password: hashedPassword, role:roleId });
        if(newUser._id ===null || newUser._id === undefined){
        return {error: "Error creating a new user"}
        }       
        const token:any = await signtoken(newUser.email,roleId );
        return token;
    } catch (error:any) {
        console.log(error);
        return { error: `Error signing up: ${error.message}` };
    }
}

export async function signIn(email: string, password: string): Promise<any> {
    try {
        // Check if email and password are provided
        if (!email) {
            return { error: 'Email is required' };
        }
        if (!password) {
            return { error: 'Password is required' };
        }

        // Find the user by email
        const existingUser = await User.findOne({ email });

        // If user not found, return error
        if (!existingUser) {
            return { error: 'User not found' };
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        // If passwords don't match, return error
        if (!passwordMatch) {
            return { error: 'Incorrect password' };
        }
        const roleModels  = await RoleModel.findOne({ role_id: existingUser.role })
        const token = await signtoken(existingUser.email,existingUser.role );
        return { token:token ,role:roleModels?.value, modules: roleModels?.modules};
    } catch (error:any) {
        return { error: `Error signing in: ${error.message}` };
    }
}


