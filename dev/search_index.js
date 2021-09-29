var documenterSearchIndex = {"docs":
[{"location":"#ScientificTypes.jl","page":"Home","title":"ScientificTypes.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This package makes a distinction between machine type and scientific type of a Julia object:","category":"page"},{"location":"","page":"Home","title":"Home","text":"The machine type refers to the Julia type being used to represent the object (for instance, Float64).\nThe scientific type is one of the types defined in ScientificTypesBase.jl reflecting how the object should be interpreted (for instance, Continuous or Multiclass).","category":"page"},{"location":"","page":"Home","title":"Home","text":"A scientific type convention is an assignment of a scientific type to every Julia object, articulated by overloading the scitype method.  The DefaultConvention convention is the convention used in various Julia ecosystems.","category":"page"},{"location":"","page":"Home","title":"Home","text":"This package additionally defines tools for type coercion (the coerce method) and scientific type \"guessing\" (the autotype method).","category":"page"},{"location":"","page":"Home","title":"Home","text":"Developers interested in implementing a different convention will instead import Scientific TypesBase.jl, following the documentation there, possibly using this repo as a template.","category":"page"},{"location":"#Type-hierarchy","page":"Home","title":"Type hierarchy","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The supported scientific types have the following hierarchy:","category":"page"},{"location":"","page":"Home","title":"Home","text":"Finite{N}\n├─ Multiclass{N}\n└─ OrderedFactor{N}\n\nInfinite\n├─ Continuous\n└─ Count\n\nImage{W,H}\n├─ ColorImage{W,H}\n└─ GrayImage{W,H}\n\nScientificTimeType\n├─ ScientificDate\n├─ ScientificTime\n└─ ScientificDateTime\n\nSampleable{Ω}\n└─ Density{Ω}\n\nAnnotated{S}\n\nAnnotationFor{S}\n\nMultiset{S}\n\nTable{K}\n\nTextual\n\nManifoldPoint{MT}\n\nUnknown","category":"page"},{"location":"","page":"Home","title":"Home","text":"Additionally, we regard the Julia native types Missing and Nothing as scientific types as well.","category":"page"},{"location":"#Getting-started","page":"Home","title":"Getting started","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"This documentation focuses on properties of the scitype method specific to the default convention. The scitype method satisfies certain universal properties, with respect to its operation on tuples, arrays and tables, set out in the ScientificTypes readme, but only implicitly described here.","category":"page"},{"location":"","page":"Home","title":"Home","text":"To get the scientific type of a Julia object defined by the default convention, call scitype:","category":"page"},{"location":"","page":"Home","title":"Home","text":"using ScientificTypes\nscitype(3.14)","category":"page"},{"location":"","page":"Home","title":"Home","text":"For a vector, you can use scitype or elscitype (which will give you a scitype corresponding to the elements):","category":"page"},{"location":"","page":"Home","title":"Home","text":"scitype([1,2,3,missing])","category":"page"},{"location":"","page":"Home","title":"Home","text":"elscitype([1,2,3,missing])","category":"page"},{"location":"","page":"Home","title":"Home","text":"Occasionally, you may want to find the union of all scitypes of elements of an arbitrary iterable, which you can do with scitype_union:","category":"page"},{"location":"","page":"Home","title":"Home","text":"scitype_union((ifelse(isodd(i), i, missing) for i in 1:5))","category":"page"},{"location":"","page":"Home","title":"Home","text":"Note calling scitype_union on a large array, for example, is typically much slower than calling scitype or elscitype.","category":"page"},{"location":"#Summary-of-the-default-convention","page":"Home","title":"Summary of the default convention","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The table below summarizes the default convention for representing scientific types:","category":"page"},{"location":"","page":"Home","title":"Home","text":"Type T scitype(x) for x::T package/module required\nMissing Missing \nNothing Nothing \nAbstractFloat Continuous \nInteger Count \nString Textual \nCategoricalValue Multiclass{N} where N = nlevels(x), provided x.pool.ordered == false CategoricalArrays.jl\nCategoricalString Multiclass{N} where N = nlevels(x), provided x.pool.ordered == false CategoricalArrays.jl\nCategoricalValue OrderedFactor{N} where N = nlevels(x), provided x.pool.ordered == true CategoricalArrays.jl\nCategoricalString OrderedFactor{N} where N = nlevels(x) provided x.pool.ordered == true CategoricalArrays.jl\nDate ScientificDate Dates\nTime ScientificTime Dates\nDateTime ScientificDateTime Dates\nDistributions.Sampleable{F,S} Sampleable{Ω} where Ω is scitype of sample space, according to {F,S} \nDistributions.Distributions{F,S} Density{Ω} where Ω is scitype of sample space, according to {F,S} \nAbstractArray{<:Gray,2} GrayImage{W,H} where (W, H) = size(x) ColorTypes.jl\nAbstractArrray{<:AbstractRGB,2} ColorImage{W,H} where (W, H) = size(x) ColorTypes.jl\nPersistenceDiagram PersistenceDiagram PersistenceDiagramsBase\nany table type T supported by Tables.jl Table{K} where K=Union{column_scitypes...} Tables.jl\n† CorpusLoaders.TaggedWord Annotated{Textual} CorpusLoaders.jl\n† CorpusLoaders.Document{AbstractVector{Q}} Annotated{AbstractVector{Scitype(Q)}} CorpusLoaders.jl\n† AbstractDict{<:AbstractString,<:Integer} Multiset{Textual} \n† AbstractDict{<:TaggedWord,<:Integer} Multiset{Annotated{Textual}} CorpusLoaders.jl","category":"page"},{"location":"","page":"Home","title":"Home","text":"† Experimental and subject to change in new minor or patch release","category":"page"},{"location":"","page":"Home","title":"Home","text":"Here nlevels(x) = length(levels(x.pool)).","category":"page"},{"location":"#Notes","page":"Home","title":"Notes","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"We regard the built-in Julia types Missing and Nothing as scientific types.\nFinite{N}, Multiclass{N} and OrderedFactor{N} are all parameterized by the number of levels N. We export the alias Binary = Finite{2}.\nImage{W,H}, GrayImage{W,H} and ColorImage{W,H} are all parameterized by the image width and height dimensions, (W, H).\nSampleable{K} andb","category":"page"},{"location":"","page":"Home","title":"Home","text":"Density{K} <: Sampleable{K} are parameterized by the sample space scitype.","category":"page"},{"location":"","page":"Home","title":"Home","text":"On objects for which the default convention has nothing to say, the scitype function returns Unknown.","category":"page"},{"location":"#Special-note-on-binary-data","page":"Home","title":"Special note on binary data","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"ScientificTypes does not define a separate \"binary\" scientific type. Rather, when binary data has an intrinsic \"true\" class (for example pass/fail in a product test), then it should be assigned an OrderedFactor{2} scitype, while data with no such class (e.g., gender) should be assigned a Multiclass{2} scitype. In the OrderedFactor{2} case we adopt the convention that the \"true\" class come after the \"false\" class in the ordering (corresponding to the usual assignment \"false=0\" and \"true=1\"). Of course, Finite{2} covers both cases of binary data.","category":"page"},{"location":"#Type-coercion-for-tabular-data","page":"Home","title":"Type coercion for tabular data","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"A common two-step work-flow is:","category":"page"},{"location":"","page":"Home","title":"Home","text":"Inspect the schema of some table, and the column scitypes in particular.\nProvide pairs of column names and scitypes (or a dictionary) that change the column machine types to reflect the desired scientific interpretation (scitype).","category":"page"},{"location":"","page":"Home","title":"Home","text":"using ScientificTypes # hide\nusing DataFrames, Tables\nX = DataFrame(\n\t name=[\"Siri\", \"Robo\", \"Alexa\", \"Cortana\"],\n\t height=[152, missing, 148, 163],\n\t rating=[1, 5, 2, 1])\nschema(X)","category":"page"},{"location":"","page":"Home","title":"Home","text":"In some further analysis of the data in X, a more likely interpretation is that :name is Multiclass, the :height is Continuous, and the :rating an OrderedFactor. Correcting the types with coerce:","category":"page"},{"location":"","page":"Home","title":"Home","text":"Xfixed = coerce(X, :name=>Multiclass,\n                   :height=>Continuous,\n                   :rating=>OrderedFactor)\nschema(Xfixed).scitypes","category":"page"},{"location":"","page":"Home","title":"Home","text":"Note that because missing values were encountered in height, an \"imperfect\" type coercion to Union{Missing,Continuous} has been performed, and a warning issued.  To avoid the warning, coerce to Union{Missing,Continuous} instead.","category":"page"},{"location":"","page":"Home","title":"Home","text":"\"Global\" replacements based on existing scientific types are also possible, and can be mixed with the name-based replacements:","category":"page"},{"location":"","page":"Home","title":"Home","text":"X  = (x = [1, 2, 3],\n      y = ['A', 'B', 'A'],\n      z = [10, 20, 30])\nXfixed = coerce(X, Count=>Continuous, :y=>OrderedFactor)\nschema(Xfixed).scitypes","category":"page"},{"location":"","page":"Home","title":"Home","text":"Finally there is a coerce! method that does in-place coercion provided the data structure supports it.","category":"page"},{"location":"#Type-coercion-for-image-data","page":"Home","title":"Type coercion for image data","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"To have a scientific type of Image a julia object must be a two-dimensional array whose element type is subtype of Gray or AbstractRGB (color types from the ColorTypes.jl package). And models typically expect collections of images to be vectors of such two-dimensional arrays. Implementations of coerce allow the conversion of some common image formats into one of these. The eltype in these other formats can be any subtype of Real, which includes the FixedPoint type from the FixedPointNumbers.jl package.","category":"page"},{"location":"#Coercing-a-single-image","page":"Home","title":"Coercing a single image","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Coercing a gray image, represented as a Real matrix (W x H format):","category":"page"},{"location":"","page":"Home","title":"Home","text":"using ScientificTypes # hide\nimg = rand(10, 10)\ncoerce(img, GrayImage) |> scitype","category":"page"},{"location":"","page":"Home","title":"Home","text":"Coercing a color image, represented as a Real 3-D array (W x H x C format):","category":"page"},{"location":"","page":"Home","title":"Home","text":"img = rand(10, 10, 3)\ncoerce(img, ColorImage) |> scitype","category":"page"},{"location":"#Coercing-collections-of-images","page":"Home","title":"Coercing collections of images","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Coercing a collection of gray images, represented as a Real 3-D array (W x H x N format):","category":"page"},{"location":"","page":"Home","title":"Home","text":"imgs = rand(10, 10, 3)\ncoerce(imgs, GrayImage) |> scitype","category":"page"},{"location":"","page":"Home","title":"Home","text":"Coercing a collection of gray images, represented as a Real 4-D array (W x H x {1} x N format):","category":"page"},{"location":"","page":"Home","title":"Home","text":"imgs = rand(10, 10, 1, 3)\ncoerce(imgs, GrayImage) |> scitype","category":"page"},{"location":"","page":"Home","title":"Home","text":"Coercing a collection of color images, represented as a Real 4-D array (W x H x C x N format):","category":"page"},{"location":"","page":"Home","title":"Home","text":"imgs = rand(10, 10, 3, 5)\ncoerce(imgs, ColorImage) |> scitype","category":"page"},{"location":"#Detailed-usage-examples","page":"Home","title":"Detailed usage examples","text":"","category":"section"},{"location":"#Basics","page":"Home","title":"Basics","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"using ScientificTypes # hide\nusing CategoricalArrays\nscitype((2.718, 42))","category":"page"},{"location":"","page":"Home","title":"Home","text":"In the default convention, to construct arrays with categorical scientific element type one needs to use CategorialArrays:","category":"page"},{"location":"","page":"Home","title":"Home","text":"v = categorical(['a', 'c', 'a', missing, 'b'], ordered=true)\nscitype(v[1])","category":"page"},{"location":"","page":"Home","title":"Home","text":"elscitype(v)","category":"page"},{"location":"","page":"Home","title":"Home","text":"Coercing to Multiclass:","category":"page"},{"location":"","page":"Home","title":"Home","text":"w = coerce(v, Union{Missing,Multiclass})\nelscitype(w)","category":"page"},{"location":"#Working-with-tables","page":"Home","title":"Working with tables","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"While schema is convenient for inspecting the column scitypes of a table, there is also a scitype for the tables themselves:","category":"page"},{"location":"","page":"Home","title":"Home","text":"using ScientificTypes # hide\ndata = (x1=rand(10), x2=rand(10))\nschema(data)","category":"page"},{"location":"","page":"Home","title":"Home","text":"scitype(data)","category":"page"},{"location":"","page":"Home","title":"Home","text":"Similarly, any table implementing the Tables interface has scitype Table{K}, where K is the union of the scitypes of its columns.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Table scitypes are useful for dispatch and type checks, as shown here, with the help of a constructor for Table scitypes provided by Scientific Types.jl:","category":"page"},{"location":"","page":"Home","title":"Home","text":"Table(Continuous, Count)","category":"page"},{"location":"","page":"Home","title":"Home","text":"Table{<:Union{AbstractArray{<:Continuous},AbstractArray{<:Count}}}","category":"page"},{"location":"","page":"Home","title":"Home","text":"scitype(data) <: Table(Continuous)","category":"page"},{"location":"","page":"Home","title":"Home","text":"scitype(data) <: Table(Infinite)","category":"page"},{"location":"","page":"Home","title":"Home","text":"data = (x=rand(10), y=collect(1:10), z = [1,2,3,1,2,3,1,2,3,1])\ndata = coerce(data, :z=>OrderedFactor)\nscitype(data) <: Table(Continuous,Count,OrderedFactor)","category":"page"},{"location":"","page":"Home","title":"Home","text":"Note that Table(Continuous,Finite) is a type union and not a Table instance.","category":"page"},{"location":"#Tuples-and-arrays","page":"Home","title":"Tuples and arrays","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The behavior of scitype on tuples is as you would expect:","category":"page"},{"location":"","page":"Home","title":"Home","text":"using ScientificTypes #hide\nscitype((1, 4.5))","category":"page"},{"location":"","page":"Home","title":"Home","text":"For performance reasons, the behavior of scitype on arrays has some wrinkles, in the case of missing values:","category":"page"},{"location":"","page":"Home","title":"Home","text":"The scitype of an array. The scitype of an AbstractArray, A, is alwaysAbstractArray{U} where U is the union of the scitypes of the elements of A, with one exception: If typeof(A) <: AbstractArray{Union{Missing,T}} for some T different from Any, then the scitype of A is AbstractArray{Union{Missing, U}}, where U is the union over all non-missing elements, even if A has no missing elements.","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> v = [1.3, 4.5, missing]\njulia> scitype(v)\nAbstractArray{Union{Missing, Continuous},1}","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> scitype(v[1:2])\nAbstractArray{Union{Missing, Continuous},1}","category":"page"},{"location":"#Automatic-type-conversion","page":"Home","title":"Automatic type conversion","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"The autotype function allows to use specific rules in order to guess appropriate scientific types for tabular data. Such rules would typically be more constraining than the ones implied by the active convention. When autotype is used, a dictionary of suggested types is returned for each column in the data; if none of the specified rule applies, the ambient convention is used as \"fallback\".","category":"page"},{"location":"","page":"Home","title":"Home","text":"The function is called as:","category":"page"},{"location":"","page":"Home","title":"Home","text":"autotype(X)","category":"page"},{"location":"","page":"Home","title":"Home","text":"If the keyword only_changes is passed set to true, then only the column names for which the suggested type is different from that provided by the convention are returned.","category":"page"},{"location":"","page":"Home","title":"Home","text":"autotype(X; only_changes=true)","category":"page"},{"location":"","page":"Home","title":"Home","text":"To specify which rules are to be applied, use the rules keyword  and specify a tuple of symbols referring to specific rules; the default rule is :few_to_finite which applies a heuristic for columns which have relatively few values, these columns are then encoded with an appropriate Finite type. It is important to note that the order in which the rules are specified matters; rules will be applied in that order.","category":"page"},{"location":"","page":"Home","title":"Home","text":"autotype(X; rules=(:few_to_finite,))","category":"page"},{"location":"","page":"Home","title":"Home","text":"Finally, you can also use the following shorthands:","category":"page"},{"location":"","page":"Home","title":"Home","text":"autotype(X, :few_to_finite)\nautotype(X, (:few_to_finite, :discrete_to_continuous))","category":"page"},{"location":"#Available-rules","page":"Home","title":"Available rules","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Rule symbol scitype suggestion\n:few_to_finite an appropriate Finite subtype for columns with few distinct values\n:discrete_to_continuous if not Finite, then Continuous for any Count or Integer scitypes/types\n:string_to_multiclass Multiclass for any string-like column","category":"page"},{"location":"","page":"Home","title":"Home","text":"Autotype can be used in conjunction with coerce:","category":"page"},{"location":"","page":"Home","title":"Home","text":"X_coerced = coerce(X, autotype(X))","category":"page"},{"location":"#Examples","page":"Home","title":"Examples","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"By default it only applies the :few_to_finite rule","category":"page"},{"location":"","page":"Home","title":"Home","text":"using ScientificTypes # hide\nn = 50\nX = (a = rand(\"abc\", n),         # 3 values, not number        --> Multiclass\n     b = rand([1,2,3,4], n),     # 4 values, number            --> OrderedFactor\n     c = rand([true,false], n),  # 2 values, number but only 2 --> Multiclass\n     d = randn(n),               # many values                 --> unchanged\n     e = rand(collect(1:n), n))  # many values                 --> unchanged\nautotype(X, only_changes=true)","category":"page"},{"location":"","page":"Home","title":"Home","text":"For example, we could first apply the :discrete_to_continuous rule, followed by :few_to_finite rule. The first rule will apply to b and e but the subsequent application of the second rule will mean we will get the same result apart for e (which will be Continuous)","category":"page"},{"location":"","page":"Home","title":"Home","text":"autotype(X, only_changes=true, rules=(:discrete_to_continuous, :few_to_finite))","category":"page"},{"location":"","page":"Home","title":"Home","text":"One should check and possibly modify the returned dictionary before passing to coerce.","category":"page"},{"location":"#API-reference","page":"Home","title":"API reference","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"ScientificTypes.scitype\nScientificTypes.elscitype\nScientificTypes.scitype_union\ncoerce\nautotype","category":"page"},{"location":"#ScientificTypesBase.scitype","page":"Home","title":"ScientificTypesBase.scitype","text":"scitype(X)\n\nThe scientific type (interpretation) of X, as distinct from its machine type, as specified by the active convention.\n\nExamples from the MLJ convention\n\njulia> using ScientificTypes # or `using MLJ`\njulia> scitype(3.14)\nContinuous\n\njulia> scitype([1, 2, 3, missing])\nAbstractArray{Union{Missing, Count},1}\n\njulia> scitype((5, \"beige\"))\nTuple{Count, Textual}\n\njulia> using CategoricalArrays\njulia> X = (gender = categorical(['M', 'M', 'F', 'M', 'F']),\n            ndevices = [1, 3, 2, 3, 2])\njulia> scitype(X)\nTable{Union{AbstractArray{Count,1}, AbstractArray{Multiclass{2},1}}}\n\nThe specific behavior of scitype is governed by the active convention, as returned by ScientificTypesBase.convention(). The ScientificTypes.jl documentation details the convention demonstrated above.\n\n\n\n\n\n","category":"function"},{"location":"#ScientificTypesBase.elscitype","page":"Home","title":"ScientificTypesBase.elscitype","text":"elscitype(A)\n\nReturn the element scientific type of an abstract array A. By definition, if scitype(A) = AbstractArray{S,N}, then elscitype(A) = S.\n\n\n\n\n\n","category":"function"},{"location":"#ScientificTypesBase.scitype_union","page":"Home","title":"ScientificTypesBase.scitype_union","text":"scitype_union(A)\n\nReturn the type union, over all elements x generated by the iterable A, of scitype(x). See also scitype.\n\n\n\n\n\n","category":"function"},{"location":"#ScientificTypes.coerce","page":"Home","title":"ScientificTypes.coerce","text":"coerce(A, specs...; tight=false, verbosity=1)\n\nGiven a table A, return a copy of A, ensuring that the element scitypes of the columns match the new specification, specs. There are three valid specifiations:\n\n(i) one or more column_name=>Scitype pairs:\n\ncoerce(X, col1=>Sciyype1, col2=>Scitype2, ... ; verbosity=1)\n\n(ii) one or more OldScitype=>NewScitype pairs (OldScitype covering both the OldScitype and Union{Missing,OldScitype} cases):\n\ncoerce(X, OldScitype1=>NewSciyype1, OldScitype2=>NewScitype2, ... ; verbosity=1)\n\n(iii) a dictionary of scientific types keyed on column names:\n\ncoerce(X, d::AbstractDict{<:ColKey, <:Type}; verbosity=1)\n\nwhere ColKey = Union{Symbol,AbstractString}.\n\nExamples\n\nSpecifiying  column_name=>Scitype pairs:\n\nusing CategoricalArrays, DataFrames, Tables\nX = DataFrame(name=[\"Siri\", \"Robo\", \"Alexa\", \"Cortana\"],\n              height=[152, missing, 148, 163],\n              rating=[1, 5, 2, 1])\nXc = coerce(X, :name=>Multiclass, :height=>Continuous, :rating=>OrderedFactor)\nschema(Xc).scitypes # (Multiclass, Continuous, OrderedFactor)\n\nSpecifying OldScitype=>NewScitype pairs:\n\nX  = (x = [1, 2, 3],\n      y = rand(3),\n      z = [10, 20, 30])\nXc = coerce(X, Count=>Continuous)\nschema(Xfixed).scitypes # (Continuous, Continuous, Continuous)\n\n\n\n\n\n","category":"function"},{"location":"#ScientificTypes.autotype","page":"Home","title":"ScientificTypes.autotype","text":"autotype(X; kw...)\n\nReturn a dictionary of suggested scitypes for each column of X, a table or an array based on rules\n\nKwargs\n\nonly_changes=true:       if true, return only a dictionary of the names for                             which applying autotype differs from just using                             the ambient convention. When coercing with                             autotype, only_changes should be true.\nrules=(:few_to_finite,): the set of rules to apply.\n\n\n\n\n\n","category":"function"}]
}
