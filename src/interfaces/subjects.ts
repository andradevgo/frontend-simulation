export interface Subject {
    id?:number,
    name:string,
    division:number,
    classroom:string,
    credits:number,
    registration_date:Date,
    slots:number
}

export interface enrolledSubjects {
    student_name: string,
    subject_name: string,
    classroom: string,
    credits: number,
    slots: number,
    subject_group: number,
    enrollment_date: Date
}