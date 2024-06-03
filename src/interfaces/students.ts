export interface Student {
    id?:number,
    name:string,
    age:number,
    document_type:string,
    document_number:string,
    registration_date:Date,
    status:'a' | 'i',
}

export interface StudentInSubject {
    student_name: string,
    age: number,
    document_number: number,
    student_registration_date: Date,
    enrollment_date: Date
}