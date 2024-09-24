import bcrypt from 'bcryptjs';


export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(15);
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash
}

export const matchPassword = async (storedPassword, entredPassword) => {
    return await bcrypt.compare(entredPassword, storedPassword);
}