[
{
  "student_id": 1,
  "course_code": "CS101",
  "semester": "2022-ODD",
  "rating": 5,
  "comments": "Excellent teaching.",
  "tags": ["challenging","well-structured","good-examples"],
  "attachments": [{"filename":"notes.pdf","size_kb":240}]
},
{
  "student_id": 2,
  "course_code": "CS101",
  "semester": "2022-ODD",
  "rating": 4,
  "comments": "Very informative.",
  "tags": ["challenging","interactive"],
  "attachments": [{"filename":"assignment.pdf","size_kb":120}]
},
{
  "student_id": 3,
  "course_code": "CS101",
  "semester": "2021-EVEN",
  "rating": 2,
  "comments": "Too fast paced.",
  "tags": ["difficult","challenging"],
  "attachments": [{"filename":"feedback.docx","size_kb":80}]
},
{
  "student_id": 4,
  "course_code": "CS102",
  "semester": "2022-ODD",
  "rating": 5,
  "comments": "Loved the practical sessions.",
  "tags": ["hands-on","interesting"],
  "attachments": [{"filename":"lab.pdf","size_kb":300}]
},
{
  "student_id": 5,
  "course_code": "CS102",
  "semester": "2022-EVEN",
  "rating": 3,
  "comments": "Average experience.",
  "tags": ["average"],
  "attachments": [{"filename":"report.pdf","size_kb":150}]
},
{
  "student_id": 6,
  "course_code": "CS103",
  "semester": "2022-ODD",
  "rating": 1,
  "comments": "Needs improvement.",
  "tags": ["boring","outdated"],
  "attachments": [{"filename":"review.pdf","size_kb":90}]
},
{
  "student_id": 7,
  "course_code": "CS103",
  "semester": "2022-ODD",
  "rating": 4,
  "comments": "Good content.",
  "tags": ["well-structured","good-examples"],
  "attachments": [{"filename":"notes2.pdf","size_kb":220}]
},
{
  "student_id": 8,
  "course_code": "CS104",
  "semester": "2021-EVEN",
  "rating": 2,
  "comments": "Could be better.",
  "tags": ["difficult"],
  "attachments": [{"filename":"remarks.pdf","size_kb":70}]
},
// 63. student 9 has no attachment field 
{
  "student_id": 9,
  "course_code": "CS104",
  "semester": "2022-ODD",
  "rating": 5,
  "comments": "Excellent course.",
  "tags": ["interactive","good-examples"]
},
{
  "student_id": 10,
  "course_code": "CS105",
  "semester": "2022-EVEN",
  "rating": 3,
  "comments": "Decent course.",
  "tags": ["average","informative"],
  "attachments": [{"filename":"course.pdf","size_kb":180}]
}
]

//64
db.feedback.countDocuments() //10
db.feedback.find()
//65
db.feedback.find({rating: 5})
//66
db.feedback.find({course_code: "CS101", tags: "challenging" })
db.feedback.find({course_code: "CS101", tags: { $elemMatch: { $eq: "challenging" } } })
//67 READ: Retrieve only the student_id, course_code, and rating fields 
db.feedback.find({},{student_id: 1, course_code: 1, rating: 1, _id: 0 })
//68 UPDATE: For all feedback documents with rating < 3, add a field needs_review: true using updateMany and $set.
db.feedback.updateMany({rating: { $lt: 3 }},{$set: { needs_review: true }})
db.feedback.find({needs_review: true})//verify
//69 UPDATE: Push a new tag 'reviewed' into the tags array of all documents where needs_review is true, using $push.
db.feedback.updateMany({needs_review: true},{$push: {tags: "reviewed"}})
//70 DELETE: Delete all feedback documents where the semester is '2021-EVEN'
db.feedback.deleteMany({semester: "2021-EVEN"}) //total documents:8


//71. Write a pipeline that: (Stage 1) filters to semester '2022-ODD'; (Stage 2) groups by course_code calculating average rating and total feedback count; (Stage 3) sorts by average rating descending.
//72. Extend the pipeline with a $project stage to rename avg_rating to average_rating and round it to 1
db.feedback.aggregate([
    {
        $match: {semester: "2022-ODD"}
    },
    {$group: {_id: "$course_code",
            avg_rating: {$avg: "$rating"},total_feedback: { $sum: 1}}
    },
    {
        $sort: {avg_rating: -1}
    },
    {$project: {
            _id: 0,
            course_code: "$_id",
            average_rating: {
                $round: ["$avg_rating", 1]
            },
            total_feedback: 1
        }
    }])
//decimal place using $round.
//73. Write a pipeline that uses $unwind on the tags array, then $group by tag to count how many times each tag appears. Sort by count descending — a tag frequency leaderboard.
db.feedback.aggregate([{$unwind: "$tags"},{
        $group: {_id: "$tags",count: {$sum: 1}}
    },
    {$sort: {count: -1}}])
//74. Add an index on course_code 
db.feedback.createIndex({
    course_code: 1
})