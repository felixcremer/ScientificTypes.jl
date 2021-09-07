# Basic scitypes

ST.scitype(::Integer,        ::DefaultConvention) = Count
ST.scitype(::AbstractFloat,  ::DefaultConvention) = Continuous
ST.scitype(::AbstractString, ::DefaultConvention) = Textual
ST.scitype(::TimeType,       ::DefaultConvention) = ScientificTimeType
ST.scitype(::Time    ,       ::DefaultConvention) = ScientificTime
ST.scitype(::Date,           ::DefaultConvention) = ScientificDate
ST.scitype(::DateTime,       ::DefaultConvention) = ScientificDateTime

# Image scitypes

ST.scitype(img::Arr{<:Gray,2}, ::DefaultConvention) = GrayImage{size(img)...}
ST.scitype(img::Arr{<:AbstractRGB,2}, ::DefaultConvention) =
ColorImage{size(img)...}

# Persistence diagrams

ST.scitype(::PersistenceDiagram, ::DefaultConvention) = PersistenceDiagram

# CategoricalArray scitype

function ST.scitype(c::Cat, ::DefaultConvention)
    nc = length(levels(c.pool))
    return ifelse(c.pool.ordered, OrderedFactor{nc}, Multiclass{nc})
end

const CatArrOrSub{T, N} =
    Union{CategoricalArray{T, N}, SubArray{T, N, <:CategoricalArray}}

function ST.scitype(A::CatArrOrSub{T,N}, ::DefaultConvention) where {T,N}
    nlevels = length(levels(A))
    S = ifelse(isordered(A), OrderedFactor{nlevels}, Multiclass{nlevels})
    T >: Missing && (S = Union{S,Missing})
    return AbstractArray{S,N}
end

# Table scitype

function ST.scitype(X, ::DefaultConvention, ::Val{:table}; kw...)
    Xcol = Tables.columns(X)
    col_names = Tables.columnnames(Xcol)
    types = map(col_names) do name
        scitype(Tables.getcolumn(Xcol, name); kw...)
    end
    return Table{Union{types...}}
end

# Distributions

const Dist = Distributions

scalar_scitype(::Type) = Unknown
scalar_scitype(::Type{<:Dist.Discrete}) = Count
scalar_scitype(::Type{<:Dist.Continuous}) = Continuous
space_scitype(variate_form::Type{<:Dist.ArrayLikeVariate{0}},
              value_support) =
                  scalar_scitype(value_support)
space_scitype(variate_form::Type{<:Dist.ArrayLikeVariate{N}},
              value_support) where N =
                  AbstractArray{scalar_scitype(value_support),N}

ST.scitype(::Distributions.Sampleable{F,S}) where {F,S} =
    Sampleable{space_scitype(F,S)}

ST.scitype(::Distributions.Distribution{F,S}) where {F,S} =
    Density{space_scitype(F,S)}

# Text analysis - EXPERIMENTAL

# This would be less of a hack if some of #155 were adopted.

type2scitype(T::Type) = ST.Scitype(T, DefaultConvention())
type2scitype(::Type{<:AbstractVector{T}}) where T =
    AbstractVector{type2scitype(T)}
type2scitype(::NTuple{N,T}) where {N,T} = NTuple{type2scitype{T}}
const PlainNGram{N}  = NTuple{N,<:AbstractString}
const TaggedNGram{N} = NTuple{N,<:CorpusLoaders.TaggedWord}
ST.scitype(::TaggedWord, ::DefaultConvention) = Annotated{Textual}
ST.scitype(::Document{<:AbstractVector{T}}, ::DefaultConvention) where T =
    Annotated{AbstractVector{type2scitype(T)}}
ST.scitype(::AbstractDict{<:AbstractString,<:Integer},
           ::DefaultConvention) = Multiset{Textual}
ST.scitype(::AbstractDict{<:TaggedWord,<:Integer},
           ::DefaultConvention) = Multiset{Annotated{Textual}}
ST.scitype(::AbstractDict{<:Union{TaggedWord,AbstractString},<:Integer},
           ::DefaultConvention) =
               Multiset{Union{Textual,Annotated{Textual}}}
ST.scitype(::AbstractDict{<:PlainNGram{N}}) where N =
    Multiset{NTuple{N,Textual}}
ST.scitype(::AbstractDict{<:TaggedNGram{N}}) where N =
    Multiset{NTuple{N,Annotated{Textual}}}
ST.scitype(::AbstractDict{<:PlainNGram}) =
    Multiset{NTuple{<:Any,Textual}}
ST.scitype(::AbstractDict{<:TaggedNGram}) =
    Multiset{NTuple{<:Any,Annotated{Textual}}}

# Scitype for fast array broadcasting

ST.Scitype(::Type{<:Integer},            ::DefaultConvention) = Count
ST.Scitype(::Type{<:AbstractFloat},      ::DefaultConvention) = Continuous
ST.Scitype(::Type{<:AbstractString},     ::DefaultConvention) = Textual
ST.Scitype(::Type{<:TimeType},           ::DefaultConvention) = ScientificTimeType
ST.Scitype(::Type{<:Date},               ::DefaultConvention) = ScientificDate
ST.Scitype(::Type{<:Time},               ::DefaultConvention) = ScientificTime
ST.Scitype(::Type{<:DateTime},           ::DefaultConvention) = ScientificDateTime
ST.Scitype(::Type{<:PersistenceDiagram}, ::DefaultConvention) = PersistenceDiagram
ST.Scitype(::Type{<:TaggedWord},         ::DefaultConvention) =
    Annotated{Textual}
