import { Link } from 'react-router-dom';
import { Star, Clock, Users, Heart, Award } from 'lucide-react';
import { Course } from '../../types';

interface CourseCardProps {
  course: Course;
  onFavorite?: (id: string) => void;
  isFavorite?: boolean;
  enrolled?: boolean;
}

const levelLabels: Record<string, string> = {
  beginner: 'Principiante',
  intermediate: 'Intermedio',
  advanced: 'Avanzado',
};

const levelColors: Record<string, string> = {
  beginner: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  intermediate: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  advanced: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export default function CourseCard({ course, onFavorite, isFavorite, enrolled }: CourseCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 group flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden h-44">
        <img
          src={course.image_url || 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600'}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${levelColors[course.level] || levelColors.beginner}`}>
            {levelLabels[course.level] || course.level}
          </span>
          {course.is_free && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-500 text-white">
              Gratis
            </span>
          )}
          {enrolled && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-600 text-white">
              Inscrito
            </span>
          )}
        </div>

        {/* Favorite */}
        {onFavorite && (
          <button
            onClick={(e) => { e.preventDefault(); onFavorite(course.id); }}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isFavorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-red-50 hover:text-red-500'
            }`}
          >
            <Heart className="w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        )}

        {/* Certificate badge */}
        {course.has_certificate && (
          <div className="absolute bottom-3 right-3">
            <span className="flex items-center gap-1 bg-amber-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
              <Award className="w-3 h-3" /> Certificado
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {course.category && (
          <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 mb-1.5">{course.category.name}</span>
        )}
        <Link to={`/curso/${course.slug}`}>
          <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug mb-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-2">
            {course.title}
          </h3>
        </Link>

        {course.instructor && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{course.instructor.full_name}</p>
        )}

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="font-semibold text-gray-700 dark:text-gray-300">{course.rating.toFixed(1)}</span>
            <span>({course.review_count})</span>
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {course.student_count.toLocaleString()}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {course.duration_hours}h
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            {course.is_free ? (
              <span className="text-lg font-bold text-green-600">Gratis</span>
            ) : (
              <>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  ${course.price.toFixed(0)}
                </span>
                {course.original_price > course.price && (
                  <span className="text-xs text-gray-400 line-through">${course.original_price.toFixed(0)}</span>
                )}
              </>
            )}
          </div>
          <Link
            to={`/curso/${course.slug}`}
            className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Ver curso
          </Link>
        </div>
      </div>
    </div>
  );
}
